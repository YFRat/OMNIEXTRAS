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
                player.tell(Text.red("§lGet out."));
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

    const hasPerk = player.tags.contains('Perk.Obtained');
    const hasMurk = player.tags.contains('Murk.Obtained');

    item.count--;
    if (!hasPerk && !hasMurk) {
        player.tell(Text.green("§lYou wield the Omnitrix? You seem worthy enough.. Let me just.."));
        const roll = Math.floor(Math.random() * 2) + 1;
        if (roll === 1) {
            player.runCommandSilent(`superpower add omni_extras:not_aliens/tempremove ${player.name.string}`);
        } else {
            player.runCommandSilent(`superpower add omni_extras:not_aliens/tempremovealt ${player.name.string}`);
        }
    } else if (hasPerk) {
        player.tell(Text.green("§lHuh.. you already have that one? Let me just.."));
        player.runCommandSilent(`superpower add omni_extras:not_aliens/tempremovealt ${player.name.string}`);
    } else if (hasMurk) {
        player.tell(Text.green("§lHuh.. you already have that one? Let me just.."));
        player.runCommandSilent(`superpower add omni_extras:not_aliens/tempremove ${player.name.string}`);
    }

    player.runCommandSilent(`playsound alienevo:prototype_master_control master ${player.name.string}`);
});

function hasOmnitrix(player) {
  return [
    'alienevo:prototype_omnitrix',
    'evo_reds_alienpack_noncustom:recal_omnitrix',
    'evo_reds_alienpack_bug:prototype_omnitrix',
    'evo_reds_alienpack_ult_noncustom:ult_omnitrix',
    'evo_reds_alienpack_ult:ult_omnitrix',
    'evo_reds_alienpack:recal_omnitrix',
    'evo_reds_alienpack_completed:completed_omnitrix'
  ].some(p => palladium.superpowers.hasSuperpower(player, p));
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