ItemEvents.entityInteracted("minecraft:air", e => {
    const player = e.player;
    const target = e.target;

    if (!target || !target.isLiving()) return;

    if (target.type !== 'minecraft:zombified_piglin' || !palladium.superpowers.hasSuperpower(target, 'omni_extras:xylene'))
        return;

    if (!hasOmnitrix(player)) {
        const roll = Math.floor(Math.random() * 3) + 1;
        switch (roll) {
            case 1:
                player.tell(Text.red("§lIs there something you need?"));
                break;
            case 2:
                player.tell(Text.red("§lWhat are you looking at?"));
                break;
            case 3:
                player.tell(Text.red("§lGet out."));
                break;
        }
        return;
    }

    const hasPerk = hasAlien(player, 111);
    const hasMurk = hasAlien(player, 112);
    const anyGourmands = hasPerk || hasMurk;
    const omni = getOmnitrixId(player)

    if (hasPerk && hasMurk) {
        player.tell(Text.red("§lI've given you all that I could give"));
        player.level.playSound(null, player.x, player.y, player.z, "minecraft:entity.villager.no", "master", 10, 1.5)
        return;
    }

    if (hasPerk && !hasMurk) {
        player.addTag('Gourmand.Grant')
        player.addTag('Variant.Murk')
        if (omni === "alienevo:prototype_omnitrix") {
            palladium.superpowers.removeSuperpower(player, omni);
            palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/proto_scan_mode');
        } else if (omni === "alienevo:recal_omnitrix") {
            palladium.superpowers.removeSuperpower(player, omni);
            palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/recal_scan_mode');
        } else if (omni === "alienevo:ult_omnitrix") {
            palladium.superpowers.removeSuperpower(player, omni);
            palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/ultimatrix_scan_mode');
        } else {
            palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/tempremovealt');
        }
        return
    }

    if (hasMurk && !hasPerk) {
        player.addTag('Gourmand.Grant')
        player.addTag('Variant.Perk')
        if (omni === "alienevo:prototype_omnitrix") {
            palladium.superpowers.removeSuperpower(player, omni);
            palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/proto_scan_mode');
        } else if (omni === "alienevo:recal_omnitrix") {
            palladium.superpowers.removeSuperpower(player, omni);
            palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/recal_scan_mode');
        }
        else if (omni === "alienevo:ult_omnitrix") {
            palladium.superpowers.removeSuperpower(player, omni);
            palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/ultimatrix_scan_mode');
        } else {
            palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/tempremovealt');
        }
        return
    }
    if (!anyGourmands) {
        player.addTag('Gourmand.Grant')
        player.addTag('First.Time')

        const roll = Math.floor(Math.random() * 2) + 1;
        if (roll === 1) {
            player.addTag('Variant.Perk')
            if (omni === "alienevo:prototype_omnitrix") {
                palladium.superpowers.removeSuperpower(player, omni);
                palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/proto_scan_mode');
            } else if (omni === "alienevo:recal_omnitrix") {
                palladium.superpowers.removeSuperpower(player, omni);
                palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/recal_scan_mode');
            } else if (omni === "alienevo:ult_omnitrix") {
                palladium.superpowers.removeSuperpower(player, omni);
                palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/ultimatrix_scan_mode');
            } else {
                palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/tempremovealt');
            }
            return
        } else if (roll === 2) {
            player.addTag('Variant.Murk')
            if (omni === "alienevo:prototype_omnitrix") {
                palladium.superpowers.removeSuperpower(player, omni);
                palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/proto_scan_mode');
            } else if (omni === "alienevo:recal_omnitrix") {
                palladium.superpowers.removeSuperpower(player, omni);
                palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/recal_scan_mode');
            } else if (omni === "alienevo:ult_omnitrix") {
                palladium.superpowers.removeSuperpower(player, omni);
                palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/ultimatrix_scan_mode');
            } else {
                palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/tempremovealt');
            }
            return
        }
    }
});

PlayerEvents.tick(event => {
    let player = event.entity

    if (player.tags.contains("CheatCode.Perk")) {
        palladium.setProperty(player, 'omnitrix_cycle', 111)
        player.removeTag("CheatCode.Perk")
    }
    else if (player.tags.contains("CheatCode.Murk")) {
        palladium.setProperty(player, 'omnitrix_cycle', 112)
        player.removeTag("CheatCode.Murk")
    }
});

function hasOmnitrix(player) {
    let currentPowers = palladium.powers.getPowerIds(player);
    if (currentPowers && currentPowers.length > 0) {
        for (let powerId of currentPowers) {
            let powerIdStr = String(powerId).toLowerCase();
            if (powerIdStr.includes('omnitrix')) {
                return true;
            }
        }
    }

    return false; //made by the goat beans
}

function hasAlien(player, alienId) {
    for (let playlist = 1; playlist <= 10; playlist++) {
        for (let slot = 1; slot <= 10; slot++) {
            let alienKey = `alienevo.alien_${playlist}_${slot}`;
            let storedAlienId = player.persistentData.getInt(alienKey);
            if (storedAlienId === alienId) {
                return true;
            }
        }
    }
    return false; //made by the goat beans
}
EntityEvents.hurt(event => {
    let entity = event.entity;
    if (
        abilityUtil.hasPower(entity, "omni_extras:xylene")
    ) {
        let oldHealth = entity.health;
        event.server.scheduleInTicks(1, () => {
            if (entity.health < oldHealth) {
                entity.level.playSound(null, entity.x, entity.y, entity.z, "minecraft:entity.witch.hurt", "master", 1, 1.3)
            }
            event.server.scheduleInTicks(1, () => {
                if (entity.health === 0) {
                    entity.level.playSound(null, entity.x, entity.y, entity.z, "minecraft:entity.witch.death", "master", 1, 1.7)
                }
            });
        });
    }
});

function getOmnitrixId(player) {
    let powers = palladium.powers.getPowerIds(player);

    if (!powers || powers.length === 0) return null;

    for (let powerId of powers) {
        let id = String(powerId);

        if (id.toLowerCase().includes("omnitrix")) {
            return id;
        }
    }

    return null;
}