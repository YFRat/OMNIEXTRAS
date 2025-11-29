let LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity');
const SCALE_TYPES = Java.loadClass("virtuoel.pehkui.api.ScaleTypes");


let vacuumedEntities = [];
let totalHealthHeld = 0;
let entityVacuumTimes = [];
let originalScales = [];

StartupEvents.registry('palladium:abilities', (event) => {
    event.create('omni_extras:modified_vacuum')
        .icon(palladium.createItemIcon('minecraft:ender_eye'))
        .addProperty("range", "float", 5.0, "Range to search for entities")
        .addProperty("search_radius", "float", 5.0, "Radius to search for entities")
        .addProperty("debug_mode", "boolean", true, "Enable debug messages")
        .addProperty("max_hearts", "float", 20.0, "Maximum hearts worth of entities to hold")
        .firstTick((entity, entry, holder, enabled) => {
    if (!enabled || !entity.isPlayer()) return;

    let searchRadius = entry.getPropertyByName("search_radius");
    let range = entry.getPropertyByName("range");
    let debugMode = entry.getPropertyByName("debug_mode");
    let maxHearts = entry.getPropertyByName("max_hearts");

    vacuumedEntities = [];
    totalHealthHeld = 0;
    entityVacuumTimes = [];
    originalScales = [];

    let ray = entity.rayTrace(range);
    if (!ray || !ray.entity) {
        if (debugMode) entity.tell("§c[Vacuum] No entity hit by raycast.");
        return;
    }

    let target = ray.entity;

    if (!(target instanceof LivingEntity)) {
        if (debugMode) entity.tell("§c[Vacuum] Raycast hit is not a living entity.");
        return;
    }

    if (debugMode) {
        entity.tell("§a[Vacuum] Locked target: " + target.getName().getString());
    }

    try {
        let entityAABB = target.boundingBox.inflate(searchRadius);
        let nearbyEntities = entity.level.getEntitiesWithin(entityAABB);
        let affectedCount = 0;

        nearbyEntities.forEach(nearby => {
            if (
                nearby == null ||
                nearby === entity ||
                !nearby.isAlive() ||
                !(nearby instanceof LivingEntity)
            ) return;

            let dx = target.x - nearby.x;
            let dy = target.y - nearby.y;
            let dz = target.z - nearby.z;
            let distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

            if (distance > searchRadius) return;

            let entityHearts = nearby.getMaxHealth() / 2;

            if (totalHealthHeld + entityHearts > maxHearts) {
                if (debugMode) {
                    entity.tell("§6[Vacuum] Skipped " + nearby.getName().getString() + 
                        " (would exceed max hearts)");
                }
                return;
            }

            let originalHeight = SCALE_TYPES.HEIGHT.getScaleData(nearby).getScale();
            let originalWidth = SCALE_TYPES.WIDTH.getScaleData(nearby).getScale();

            originalScales.push({ height: originalHeight, width: originalWidth });

            SCALE_TYPES.HEIGHT.getScaleData(nearby).setScale(0.0);
            SCALE_TYPES.WIDTH.getScaleData(nearby).setScale(0.0);

            nearby.setInvulnerable(true);
            if (!nearby.isPlayer()) nearby.setNoAi(true);
            nearby.addTag("AlienEvo.CarriedEntity");
            nearby.setSilent(true);
            nearby.noPhysics = true;

            palladium.superpowers.addSuperpower(nearby, 'alienevo:blind');

            vacuumedEntities.push(nearby);
            entityVacuumTimes.push(0);
            totalHealthHeld += entityHearts;
            affectedCount++;

            if (debugMode) {
                entity.tell("§b[Vacuum] Sucked: " + nearby.getName().getString() +
                    " (" + entityHearts.toFixed(1) + " hearts)");
            }
        });

        if (debugMode) {
            entity.tell("§a[Vacuum] Total held: " + totalHealthHeld.toFixed(1) + 
                        "/" + maxHearts + " hearts (" + affectedCount + " entities)");
        }

    } catch (e) {
        if (debugMode) entity.tell("§c[Vacuum ERROR] " + e);
    }
})

        .tick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer() && vacuumedEntities.length > 0) {
                let debugMode = entry.getPropertyByName("debug_mode");
                for (let i = 0; i < vacuumedEntities.length; i++) {
                    let vacuumedEntity = vacuumedEntities[i];
                    
                    try {
                        if (vacuumedEntity && vacuumedEntity.isAlive()) {
                            vacuumedEntity.teleportTo(entity.x, entity.y, entity.z);
                            entityVacuumTimes[i]++;
                            let ticksVacuumed = entityVacuumTimes[i];
                            let maxTicks = 400;
                            let nauseaLevel = 0;
                            
                            if (ticksVacuumed > 0) {
                                nauseaLevel = Math.min(3, Math.floor((ticksVacuumed / maxTicks) * 4));
                                
                                if (nauseaLevel > 0) {
                                    let nauseaDuration = ticksVacuumed;
                                    vacuumedEntity.potionEffects.add('minecraft:nausea', nauseaDuration, nauseaLevel - 1);
                                }
                                
                                if (debugMode && ticksVacuumed % 100 === 0) {
                                    let secondsVacuumed = (ticksVacuumed / 20).toFixed(1);
                                    let entityType = vacuumedEntity.isPlayer() ? "Player" : "Mob";
                                    entity.tell(entityType + " " + vacuumedEntity.getName().getString() + " - " + secondsVacuumed + "s vacuumed, Nausea Level: " + nauseaLevel);
                                }
                            }
                        }
                    } catch (e) {
                    }
                }
            }
        })
        .lastTick((entity, entry, holder, enabled) => {
            if (entity.isPlayer() && vacuumedEntities.length > 0) {
                let debugMode = entry.getPropertyByName("debug_mode");
                let restoredCount = 0;
                
                vacuumedEntities.forEach(vacuumedEntity => {
                    try {
                        if (vacuumedEntity && vacuumedEntity.isAlive()) {
                            SCALE_TYPES.HEIGHT.getScaleData(vacuumedEntity).setScale(1.0);
                            SCALE_TYPES.WIDTH.getScaleData(vacuumedEntity).setScale(1.0);
                            vacuumedEntity.setInvulnerable(false);

                            if (!vacuumedEntity.isPlayer()) {
                                vacuumedEntity.setNoAi(false);
                            }

                            vacuumedEntity.removeTag("AlienEvo.CarriedEntity");
                            vacuumedEntity.setSilent(false);
                            vacuumedEntity.noPhysics = false;
                            palladium.superpowers.removeSuperpower(vacuumedEntity, 'alienevo:blind');
                            
                            restoredCount++;
                            
                            if (debugMode) {
                                let entityType = vacuumedEntity.isPlayer() ? "Player" : "Mob";
                                entity.tell("Restored " + entityType + ": " + vacuumedEntity.getName().getString() + " - AI: " + !vacuumedEntity.isNoAi() + ", Sound: " + !vacuumedEntity.isSilent() + ", Physics: " + !vacuumedEntity.noPhysics);
                            }
                        }
                    } catch (e) {
                        if (debugMode) {
                            entity.tell("Error restoring entity: " + e.message);
                        }
                    }
                });
                
                if (debugMode) {
                    entity.tell("Entity Vacuum deactivated! Restored " + restoredCount + " entities to normal size");
                }

                vacuumedEntities = [];
                totalHealthHeld = 0;
                entityVacuumTimes = [];
                originalScales = [];
            }
        });
});