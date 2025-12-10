let LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity');

StartupEvents.registry('palladium:abilities', (event) => {
    event.create('omni_extras:opticoid_aoe')
        .icon(palladium.createItemIcon('minecraft:blaze_rod'))
        .addProperty("search_radius", "float", 5.0, "Radius to search for entities")
        .addProperty("mode", "string", "fire", "fire/lightning/ice")
        .addProperty("fire_seconds", "integer", 2, "Seconds on fire")
        .addProperty("freeze_seconds", "integer", 2, "Seconds frozen")
        .addProperty("slow_seconds", "integer", 2, "Seconds slowed")
        .addProperty("freeze_amp", "integer", 2, "Freeze level")
        .addProperty("slow_amp", "integer", 2, "Slowness level")
        .firstTick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                let searchRadius = entry.getPropertyByName("search_radius");
                let fireSeconds = entry.getPropertyByName("fire_seconds");
                let freezeSeconds = entry.getPropertyByName("freeze_seconds");
                let slowSeconds = entry.getPropertyByName("slow_seconds");
                let freezeAmp = entry.getPropertyByName("freeze_amp");
                let slowAmp = entry.getPropertyByName("slow_amp");

                let freezeTicks = freezeSeconds * 20;
                let slowTicks = slowSeconds * 20;
                let mode = entry.getPropertyByName("mode");

                if (mode === "fire") {
                    entity.level.playSound(null, entity.x, entity.y, entity.z, "minecraft:entity.blaze.shoot", "master", 10, 1)
                }
                if (mode === "ice") {
                    entity.level.playSound(null, entity.x, entity.y, entity.z, "minecraft:block.glass.break", "master", 10, 1.6)
                }
                if (mode === "lightning") {
                    entity.level.playSound(null, entity.x, entity.y, entity.z, "minecraft:entity.lightning_bolt.thunder", "master", 10, 1.2);
                }

                try {
                    let entityAABB = entity.boundingBox.inflate(searchRadius);
                    let nearbyEntities = entity.level.getEntitiesWithin(entityAABB);

                    nearbyEntities.forEach(nearby => {
                        if (nearby == null ||
                            nearby === entity ||
                            !nearby.isAlive()
                        ) return;
                        if (!(nearby instanceof LivingEntity)) return;
                        if (mode === "fire") {
                            nearby.addTag('Opticoid.BurningTarget');
                            palladium.superpowers.addSuperpower(nearby, "omni_extras:not_aliens/adaptive_effects");
                            nearby.setSecondsOnFire(fireSeconds)
                        }
                        else if (mode === "lightning") {
                            palladium.superpowers.addSuperpower(nearby, "omni_extras:not_aliens/electrocuted");
                        }
                        else if (mode === "ice") {
                            nearby.potionEffects.add("alienevo:freeze_effect", freezeTicks, freezeAmp, false, false);
                            nearby.potionEffects.add("minecraft:slowness", slowTicks, slowAmp, false, false);
                            nearby.addTag('Opticoid.FrozenTarget');
                            palladium.superpowers.addSuperpower(nearby, "omni_extras:not_aliens/adaptive_effects");

                        }
                    });

                } catch (e) {
                }
            }
        })
});