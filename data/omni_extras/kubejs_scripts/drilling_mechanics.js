BlockEvents.broken(event => {
    const player = event.entity.isPlayer();
    const isDrillo = palladium.superpowers.hasSuperpower(player, 'omni_extras:talpaedan');

    if (!isDrillo) return;
        if (event.block.hasTag('minecraft:mineable/pickaxe')) {
            palladium.scoreboard.addScore(player, 'Talpaedan.DigMeter', 20);
    }
});