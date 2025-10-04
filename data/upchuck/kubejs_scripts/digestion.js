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

ItemEvents.rightClicked(event =>{
    if (event.item.id === 'minecraft:nether_star') {
        if (palladium.superpowers.hasSuperpower(event.player, 'upchuck:gourmand')) {
            event.item.count--;
            event.player.tell("§2Yummy!")
            event.server.runCommandSilent(
                `energybar value add ${event.player.name.string} upchuck:gourmand stomach 1000`
            );
         
        }
    }
})