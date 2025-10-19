ItemEvents.foodEaten(e =>{
    if (e.item.hasTag('omni_extras:uneatable')) { 
        if (hasAnyGourmand(e.player)) {
            const roll = Math.floor(Math.random() * 5) + 1
           switch (roll) {
                case 1:
                    e.player.tell("§2That doesn't taste right...");
                    break;
                case 2:
                    e.player.tell("§2Ugh, I feel sick...");
                    break;
                case 3:
                    e.player.tell("§2I don't think I can eat that...");
                    break;
                case 4:
                    e.player.tell("§2*stomach rumbles*");
                    break;
                case 5:
                    e.player.tell("§2I feel nauseous...");
                    break;
            }
            palladium.superpowers.addSuperpower(e.player, 'omni_extras:not_aliens/foodpoisoned');
            e.cancel();
        }
    }
});
ItemEvents.foodEaten(e => {
    if (e.item.id !== 'omni_extras:mysterious_tablet') return

    const player = e.player

    if (hasAnyGourmand(e.player)) {
        player.tell(Text.yellow("Yummy!"));
        player.playSound('entity.player.burp');
    } else {
        player.runCommandSilent(`effect give ${player.name.string} minecraft:poison 5 1 true`);
        player.tell(Text.red("I shouldn't have eaten that.."));
    }
});

ItemEvents.foodEaten(e => {
    if (e.item.id !== 'omni_extras:granoall_bar') return

    const player = e.player

    if (hasAnyGourmand(e.player)) {
        player.tell(Text.yellow("Scrumptious!"));
        player.playSound('entity.player.burp');
        player.runCommandSilent(
            `energybar value add ${player.name.string} omni_extras:perk_gourmand stomach 300`);
        player.runCommandSilent(
            `energybar value add ${player.name.string} omni_extras:murk_gourmand stomach 300`);
    } else {
        player.runCommandSilent(`effect give ${player.name.string} minecraft:poison 5 1 true`);
        player.runCommandSilent(`effect give ${player.name.string} minecraft:hunger 9 150 true`);
        player.runCommandSilent(`effect give ${player.name.string} minecraft:nausea 8 15 true`);
        player.tell(Text.red("Oh.. God.. I'm gonna.."));
    }
    player.give('omni_extras:wrapper');
});

ItemEvents.rightClicked(e =>{
    if (e.item.id === 'minecraft:nether_star') {
        const player = e.player
        if (hasAnyGourmand(e.player)) {
            e.item.count--
            player.tell(Text.yellow("Yummy!"))
            e.server.runCommandSilent(
                `effect give ${player.name.string} minecraft:saturation 10 5 true`);
            e.server.runCommandSilent(
                `energybar value add ${player.name.string} omni_extras:perk_gourmand stomach 1500`);
            e.server.runCommandSilent(
                `scoreboard players set ${player.name.string} Gourmand.ObliterationPoint 6`);
        } else
            
            {
        };
    }
});

ItemEvents.rightClicked(e =>{
    if (e.item.id === 'minecraft:end_crystal') {
        const player = e.player
        if (hasAnyGourmand(e.player)) {
            e.item.count--
            player.tell(Text.yellow("That was delicious, but I think I need more!"))
            e.server.runCommandSilent(
                `effect give ${player.name.string} minecraft:saturation 10 1 true`);
            e.server.runCommandSilent(
                `energybar value add ${player.name.string} omni_extras:perk_gourmand stomach 300`);
            e.server.runCommandSilent(
                `scoreboard players add ${player.name.string} Gourmand.ObliterationPoint 1`);
        } else
            
            {
        };
    }
});

function hasAnyGourmand(player) {
    const gourmandPowers = [
        'omni_extras:perk_gourmand',
        'omni_extras:murk_gourmand'
    ];
    return gourmandPowers.some(power => palladium.superpowers.hasSuperpower(player, power));
}
