ItemEvents.foodEaten(e =>{
    if (e.item.hasTag('upchuck:uneatable')) { 
        if (palladium.superpowers.hasSuperpower(e.player, 'upchuck:gourmand')){
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
            palladium.superpowers.addSuperpower(e.player, 'upchuck:not_aliens/foodpoisoned');
            e.cancel();
        }
    }
});
ItemEvents.foodEaten(e => {
    if (e.item.id !== 'upchuck:mysterious_tablet') return

    const player = e.player

    if (palladium.superpowers.hasSuperpower(player, 'upchuck:gourmand')) {
        player.tell(Text.yellow("Yummy!"))
        player.playSound('entity.player.burp')
    } else {
        player.runCommandSilent(`effect give ${player.name.string} minecraft:poison 5 1 true`)
        player.tell(Text.red("I shouldn't have eaten that.."))
    }
})

ItemEvents.rightClicked(e =>{
    if (e.item.id === 'minecraft:nether_star') {
        const player = e.player
        if (palladium.superpowers.hasSuperpower(e.player, 'upchuck:gourmand')) {
            e.item.count--
            player.tell(Text.yellow("Yummy!"))
            e.server.runCommandSilent(
                `effect give ${player.name.string} minecraft:saturation 10 5 true`);
            e.server.runCommandSilent(
                `energybar value add ${player.name.string} upchuck:gourmand stomach 1500`);
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
        if (palladium.superpowers.hasSuperpower(e.player, 'upchuck:gourmand')) {
            e.item.count--
            player.tell(Text.yellow("That was delicious, but I think I need more!"))
            e.server.runCommandSilent(
                `effect give ${player.name.string} minecraft:saturation 10 1 true`);
            e.server.runCommandSilent(
                `energybar value add ${player.name.string} upchuck:gourmand stomach 300`);
            e.server.runCommandSilent(
                `scoreboard players add ${player.name.string} Gourmand.ObliterationPoint 1`);
        } else
            
            {
        };
    }
});