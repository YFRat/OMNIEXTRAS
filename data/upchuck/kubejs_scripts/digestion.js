ItemEvents.foodEaten(event =>{
    if (event.item.hasTag('upchuck:uneatable')) { 
        if (palladium.superpowers.hasSuperpower(event.player, 'upchuck:gourmand')){
            const roll = Math.floor(Math.random() * 5) + 1
           switch (roll) {
                case 1:
                    event.player.tell("§2That doesn't taste right...");
                    break;
                case 2:
                    event.player.tell("§2Ugh, I feel sick...");
                    break;
                case 3:
                    event.player.tell("§2I don't think I can eat that...");
                    break;
                case 4:
                    event.player.tell("§2*stomach rumbles*");
                    break;
                case 5:
                    event.player.tell("§2I feel nauseous...");
                    break;
            }
            palladium.superpowers.addSuperpower(event.player, 'upchuck:foodpoisoned');
            event.cancel();
        }
    }
});
ItemEvents.foodEaten(event => {
    if (event.item.id !== 'upchuck:mysterious_tablet') return

    const player = event.player

    if (palladium.superpowers.hasSuperpower(player, 'upchuck:gourmand')) {
        player.tell(Text.green("Yummy!"))
        player.playSound('entity.player.burp')
    } else {
        player.runCommandSilent(`effect give ${player.name.string} minecraft:poison 5 1 true`)
        player.tell(Text.red("I shouldn't have eaten that.."))
    }
})

ItemEvents.rightClicked(event =>{
    if (event.item.id === 'minecraft:nether_star') {
        const player = event.player
        if (palladium.superpowers.hasSuperpower(event.player, 'upchuck:gourmand')) {
            event.item.count--
            player.tell(Text.green("Yummy!"))
            event.server.runCommandSilent(
                `energybar value add ${player.name.string} upchuck:gourmand stomach 1000`
            );
        } else
            
            {
        };
    }
});