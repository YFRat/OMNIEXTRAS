ItemEvents.entityInteracted('upchuck:mysterious_tablet', e => {
    const target = e.target;

    if (!target || !target.isLiving()) return;

    if (target.type === 'minecraft:pillager' && palladium.superpowers.hasSuperpower(target, 'upchuck:xylene')) {
    if (!palladium.superpowers.hasSuperpower(e.player, 'alienevo:prototype_omnitrix')) {
        const roll = Math.floor(Math.random() * 3) + 1;
        switch (roll) {
            case 1:
                e.player.tell(Text.red("§lGet out."));
                break;
            case 2:
                e.player.tell(Text.red("§lWhat are you looking at?"));
                break;
            case 3:
                e.player.tell(Text.red("§lGet out."));
                break;
        }
        return;
    }
}

    const hasGourmand = e.player.tags.contains('Gourmand.Obtained');

    if (target.type === 'minecraft:pillager' && palladium.superpowers.hasSuperpower(target, 'upchuck:xylene')) {
        e.item.count--;
        if (!hasGourmand) {
            e.player.tell(Text.green("§lYou wield the Omnitrix? You seem worthy enough.. Let me just.."));
        } else {
            e.player.tell(Text.green("§lHuh.. you already have that one? Let me just.."));
        }

        e.player.runCommandSilent(`playsound alienevo:prototype_decouple master ${e.player.name.string}`);
        e.player.runCommandSilent(`playsound alienevo:prototype_master_control master ${e.player.name.string}`);
        e.player.runCommandSilent(`superpower add upchuck:not_aliens/tempremove ${e.player.name.string}`);
    }
});
