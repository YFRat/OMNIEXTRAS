let LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity');

StartupEvents.registry('palladium:abilities', (event) => {
    event.create('omni_extras:ignite_nearby_entities')
        .icon(palladium.createItemIcon('minecraft:blaze_rod'))
        .addProperty("search_radius", "float", 5.0, "Radius to search for entities")
        .addProperty("fire_seconds", "integer", 2, "Seconds on fire")
        .firstTick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                let searchRadius = entry.getPropertyByName("search_radius");
                let fireSeconds = entry.getPropertyByName("fire_seconds");

                entity.level.playSound(null, entity.x, entity.y, entity.z, "minecraft:entity.blaze.shoot", "master", 10, 1)
                
                try {
                    let entityAABB = entity.boundingBox.inflate(searchRadius);
                    let nearbyEntities = entity.level.getEntitiesWithin(entityAABB);
                    
                        nearbyEntities.forEach(nearby => {
                            if (nearby == null || 
                                nearby === entity || 
                                !nearby.isAlive()
                                ) return;
                            if (!(nearby instanceof LivingEntity)) return;
                            nearby.addTag('Opticoid.BurningTarget');
                            palladium.superpowers.addSuperpower(nearby, "omni_extras:not_aliens/adaptive_effects");
                            nearby.setSecondsOnFire(fireSeconds)
                        });

                } catch (e) {
                }
            }
        })
});

StartupEvents.registry('palladium:abilities', (event) => {
    event.create('omni_extras:freeze_nearby_entities')
        .icon(palladium.createItemIcon('minecraft:ice'))
        .addProperty("search_radius", "float", 5.0, "Radius to search for entities")
        .addProperty("freeze_seconds", "integer", 2, "Seconds frozen")
        .addProperty("slow_seconds", "integer", 2, "Seconds slowed")
        .addProperty("freeze_amp", "integer", 2, "Freeze level")
        .addProperty("slow_amp", "integer", 2, "Slowness level")
        .firstTick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                let searchRadius = entry.getPropertyByName("search_radius");
                let freezeSeconds = entry.getPropertyByName("freeze_seconds");
                let slowSeconds = entry.getPropertyByName("slow_seconds");
                let freezeAmp = entry.getPropertyByName("freeze_amp");
                let slowAmp = entry.getPropertyByName("slow_amp");

                let freezeTicks = freezeSeconds * 20;
                let slowTicks   = slowSeconds * 20;

                entity.level.playSound(null, entity.x, entity.y, entity.z, "minecraft:block.glass.break", "master", 10, 1.6)
                
                try {
                    let entityAABB = entity.boundingBox.inflate(searchRadius);
                    let nearbyEntities = entity.level.getEntitiesWithin(entityAABB);
                    
                        nearbyEntities.forEach(nearby => {
                            if (nearby == null || 
                                nearby === entity || 
                                !nearby.isAlive()
                                ) return;
                            if (!(nearby instanceof LivingEntity)) return;
                                nearby.potionEffects.add("alienevo:freeze_effect", freezeTicks, freezeAmp, false, false);
                                nearby.potionEffects.add("minecraft:slowness", slowTicks, slowAmp, false, false);
                                nearby.addTag('Opticoid.FrozenTarget');
                                palladium.superpowers.addSuperpower(nearby, "omni_extras:not_aliens/adaptive_effects");

                        });
                } catch (e) {    
                }
            }
        })
});
StartupEvents.registry('palladium:abilities', (event) => {
    event.create('omni_extras:zap_nearby_entities')
        .icon(palladium.createItemIcon('minecraft:lightning_rod'))
        .addProperty("search_radius", "float", 5.0, "Radius to search for entities")
        .firstTick((entity, entry, holder, enabled) => {
            if (!enabled || !entity.isPlayer()) return;

            let searchRadius = entry.getPropertyByName("search_radius");

            entity.level.playSound(null, entity.x, entity.y, entity.z, "minecraft:entity.lightning_bolt.thunder", "master", 10, 1.2);

            try {
                let entityAABB = entity.boundingBox.inflate(searchRadius);
                let nearbyEntities = entity.level.getEntitiesWithin(entityAABB);

                nearbyEntities.forEach(nearby => {
                    if (
                        nearby === null || 
                        nearby === entity ||
                        !nearby.isAlive() ||
                        !(nearby instanceof LivingEntity)
                    ) return;
                    palladium.superpowers.addSuperpower(nearby, "omni_extras:not_aliens/electrocuted");
                });
            } catch (e) {}
        });
});