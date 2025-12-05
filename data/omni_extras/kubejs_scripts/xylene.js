ItemEvents.entityInteracted('omni_extras:mysterious_tablet', e => {
    const player = e.player;
    const target = e.target;
    const item = e.item;
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
    const AnyGourmands = hasPerk || hasMurk

    if (hasPerk && hasMurk) {
        player.tell(Text.red("§lI've given you all that I could give"));
        player.level.playSound(null, player.x, player.y, player.z, "minecraft:entity.villager.no", "master", 10, 1.5)
        return;
    }

    if (!AnyGourmands) {
        player.tell(Text.green("§lYou wield the Omnitrix? You seem worthy enough.. Let me just.."));

        const roll = Math.floor(Math.random() * 2) + 1;
        if (roll === 1) {
            palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/tempremove');
        } else {
            palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/tempremovealt');
        }
    } else if (hasPerk) {
        player.tell(Text.green("§lHuh.. you already have that one? Let me just.."));
        palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/tempremovealt');
    } else if (hasMurk) {
        player.tell(Text.green("§lHuh.. you already have that one? Let me just.."));
        palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/tempremove');
    }
    item.count--;
    if (!palladium.superpowers.hasSuperpower(player, "aeo:omniverse_omnitrix"))
        player.level.playSound(null, player.x, player.y, player.z, "alienevo:prototype_master_control", "master", 10, 1)
    else
        player.level.playSound(null, player.x, player.y, player.z, "alienevo:omniverse_master_control", "master", 10, 1)
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