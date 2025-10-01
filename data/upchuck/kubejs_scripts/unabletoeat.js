ItemEvents.rightClicked(event =>{
    if (event.item.hasTag('forge:foods/cooked_meat')) { //broken rn ugh
    if (palladium.superpowers.hasSuperpower(event.player, 'upchuck:gourmand')){
        event.player.tell('§2YUCK..');
        event.item.count = Math.max(0, event.item.count - 64);
        event.cancel();
    }
}
});
