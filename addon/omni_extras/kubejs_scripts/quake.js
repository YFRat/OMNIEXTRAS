StartupEvents.registry('palladium:abilities', (event) => {
    event.create('omni_extras:modified_block_wave')
        .icon(palladium.createItemIcon('minecraft:tnt'))
        .addProperty("radius", "float", 5.0, "Radius of the block wave effect")
        .addProperty("enableVisuals", "boolean", true, "Enable particle effects")
        .addProperty("isDestructionEnabled", "boolean", true, "Enable block breaking")
        .tick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                let radius = entry.getPropertyByName("radius");
                let enableVisuals = entry.getPropertyByName("enableVisuals");
                let isDestructionEnabled = entry.getPropertyByName("isDestructionEnabled");

                if (enableVisuals) {
                    var footX = Math.floor(entity.x);
                    var footY = Math.floor(entity.y) - 1;
                    var footZ = Math.floor(entity.z);
                    var playerY = Math.floor(entity.y);

                    for (var x = -radius; x <= radius; x++) {
                        for (var z = -radius; z <= radius; z++) {
                            if (x === 0 && z === 0) {
                                continue;
                            }

                            var distance = Math.sqrt(x * x + z * z);
                            if (distance <= radius) {
                                var delay = Math.floor(radius - distance);
                                var blockX_sched = footX + x;
                                var blockZ_sched = footZ + z;
                                var currentDistance_sched = distance;
                                var current_x = x;
                                var current_z = z;

                                entity.server.schedule(delay, () => {
                                    var block = entity.level.getBlock(blockX_sched, footY, blockZ_sched);
                                    var blockId = block.getId();

                                    if (blockId !== "minecraft:air") {
                                        var effectStrength = currentDistance_sched / radius;
                                        var blockParticleCount = Math.ceil(25 * effectStrength);

                                        if (isDestructionEnabled) {
                                            var motion = 0.25 + Math.abs(current_x) * 0.02 + Math.abs(current_z) * 0.02;

                                            let fallingBlockEntity = entity.level.createEntity("falling_block");
                                            fallingBlockEntity.setPosition(blockX_sched + 0.5, footY, blockZ_sched + 0.5);

                                            let entityNbt = fallingBlockEntity.nbt;
                                            entityNbt.BlockState = { Name: blockId };

                                            if (block.properties) {
                                                entityNbt.BlockState.Properties = block.properties;
                                            }

                                            fallingBlockEntity.mergeNbt(entityNbt);
                                            block.set("air");
                                            fallingBlockEntity.spawn();
                                            fallingBlockEntity.setMotion(0, motion, 0);
                                        }

                                        if (blockParticleCount > 0) {
                                            entity.level.spawnParticles(
                                                'block ' + blockId,
                                                true,
                                                blockX_sched + 0.5,
                                                playerY + 0.5,
                                                blockZ_sched + 0.5,
                                                0.2, 0.4, 0.2,
                                                blockParticleCount,
                                                0.1
                                            );
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            }
        });
});

StartupEvents.registry('palladium:abilities', (event) => {
    event.create('omni_extras:dig_particles')
        .addProperty("radius", "float", 5.0, "Radius of the block wave effect")
        .icon(palladium.createItemIcon('minecraft:tnt'))
        .tick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                if (enabled) {
                    let radius = entry.getPropertyByName("radius");

                    let footX = Math.floor(entity.x);
                    let footY = Math.floor(entity.y) - 1;
                    let footZ = Math.floor(entity.z);
                    let playerY = Math.floor(entity.y);

                    let block = entity.level.getBlock(footX, footY, footZ);
                    let blockId = block.getId();

                    for (let x = -radius; x <= radius; x++) {
                        for (let z = -radius; z <= radius; z++) {
                            if (x === 0 && z === 0) {
                                continue;
                            }

                            let distance = Math.sqrt(x * x + z * z);
                            if (distance <= radius) {
                                let delay = Math.floor(radius - distance);
                                let blockX_sched = footX + x;
                                let blockZ_sched = footZ + z;

                                entity.server.schedule(delay, () => {
                                    entity.level.spawnParticles(
                                        'block ' + blockId,
                                        true,
                                        blockX_sched + 0.5,
                                        playerY + 0.5,
                                        blockZ_sched + 0.5,
                                        0.2, 0.4, 0.2,
                                        10,
                                        0.1
                                    );
                                })
                            }
                        }
                    }
                }
            }
        });
});