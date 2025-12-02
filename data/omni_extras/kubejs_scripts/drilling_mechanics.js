BlockEvents.broken(event => {
    const player = event.player
    const isDrillo = palladium.superpowers.hasSuperpower(player, 'omni_extras:talpaedan');
    const limit = palladium.scoreboard.getScore(player, 'Talpaedan.DigMeter')

    if (isDrillo && event.block.hasTag('minecraft:mineable/pickaxe')) {
        if (limit === 300) return
            palladium.scoreboard.addScore(player, 'Talpaedan.DigMeter', 2);
        } 
});