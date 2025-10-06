ItemEvents.entityInteracted('upchuck:mysterious_tablet', e => {
    const player = e.player;
    const target = e.target; 

    if (!target || !target.isLiving()) return;
    
    if (!palladium.superpowers.hasSuperpower(player, 'alienevo:prototype_omnitrix')){
        const roll = Math.floor(Math.random() * 3) + 1
           switch (roll) {
                case 1:
                    player.tell(Text.red("§lGet out."));
                    break;
                case 2:
                    player.tell(Text.red("§lWhat are you looking at?"));
                    break;
                case 3:
                    player.tell(Text.red("§Get out."));
                    break;
            }
        return;
    }

    if (target.type === 'minecraft:villager') {
        if (palladium.superpowers.hasSuperpower(target, 'upchuck:xylene')) {
            e.item.count--
            player.tell(Text.green("§lYou wield the Omnitrix? You seem worthy enough.. Let me just.."));
            player.runCommandSilent(`playsound alienevo:prototype_decouple master ${player.name.string}`);
            player.runCommandSilent(`playsound alienevo:prototype_master_control master ${player.name.string}`);
            player.runCommandSilent(`superpower add upchuck:tempremove ${player.name.string}`);
        } else {
           
        }
    }
});