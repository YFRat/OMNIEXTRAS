let vacuumedEntities = [];
let totalHealthHeld = 0;
let entityVacuumTimes = [];
let originalScales = [];

StartupEvents.registry('palladium:abilities', (event) => {
    event.create('upchuck:look_entity_vacuum')
        .icon(palladium.createItemIcon('minecraft:ender_eye'))
        .addProperty("search_radius", "float", 5.0, "Radius to search for entities")
        .addProperty("debug_mode", "boolean", true, "Enable debug messages")
        .addProperty("max_hearts", "float", 20.0, "Maximum hearts worth of entities to hold")
        .firstTick((entity, entry, holder, enabled) => {
    if (enabled && entity.isPlayer()) {
        let searchRadius = entry.getPropertyByName("search_radius");
        let debugMode = entry.getPropertyByName("debug_mode");
        let maxHearts = entry.getPropertyByName("max_hearts");

        vacuumedEntities = [];
        totalHealthHeld = 0;
        entityVacuumTimes = [];
        originalScales = [];

        try {
            let yaw = entity.getYaw() || 0;
            let yawRad = yaw * Math.PI / 180;

            let dirX = -Math.sin(yawRad);
            let dirZ = Math.cos(yawRad);

            let forwardDistance = searchRadius * 1.5; 
            let width = searchRadius / 3; 

            let centerX = entity.x + dirX * forwardDistance;
            let centerZ = entity.z + dirZ * forwardDistance;

            let entityAABB = AABB.of(
                centerX - width, entity.y - 1, centerZ - width,
                centerX + width, entity.y + 2, centerZ + width
            );
            let nearbyEntities = entity.level.getEntitiesWithin(entityAABB);
            let affectedCount = 0;
            if (nearbyEntities) {
                nearbyEntities.forEach(nearby => {
                    if (!nearby || nearby.id === entity.id || !nearby.isAlive()) return;
                    if (!(nearby instanceof LivingEntity)) return;

                    let dx = nearby.x - entity.x;
                    let dz = nearby.z - entity.z;
                    let distance = Math.sqrt(dx * dx + dz * dz);
                    let dot = (dx * dirX + dz * dirZ) / distance;
                    if (dot < 0.3) return; 

                    let entityMaxHealth = nearby.getMaxHealth();
                    let entityHearts = entityMaxHealth / 2.0;

                    if (totalHealthHeld + entityHearts <= maxHearts) {
                        let originalHeight = SCALE_TYPES.HEIGHT.getScaleData(nearby).getScale();
                        let originalWidth = SCALE_TYPES.WIDTH.getScaleData(nearby).getScale();
                        originalScales.push({height: originalHeight, width: originalWidth});
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
                            entity.tell(`Vacuumed ${nearby.isPlayer() ? "Player" : "Mob"} ${nearby.getName().getString()} (${entityHearts.toFixed(1)} hearts). Total: ${totalHealthHeld.toFixed(1)}/${maxHearts}`);
                        }
                    }
                });
            }
        } catch (e) {
            if (debugMode) entity.tell("Error in entity vacuum: " + e.message);
        }
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
                                    vacuumedEntity.potionEffects.add('minecraft:wither', nauseaDuration, nauseaLevel - 1);
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