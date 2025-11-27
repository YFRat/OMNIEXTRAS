global.ticksFromLastAttack = (entity) => {
    if (!entity.persistentData?.lastAttack) return;

    let lastAttack = entity.persistentData.lastAttack
    let now = Math.floor(Date.now())

    let difference = (now - lastAttack) / 50

    return difference
};

StartupEvents.registry("palladium:abilities", (event) => {
    event.create("nosedeenian:attack_command")
        .addProperty('command', 'string', "null", 'Commands that will run.')

        .tick((entity, entry, holder, enabled) => {
            if (!enabled) return;
            let victim = entity.level.getEntity(entity.persistentData.lastAttacked)
            if (!victim) return;
            if (global.ticksFromLastAttack(entity) >= 1) return
            let command = entry.getPropertyByName("command")
            
            entity.server.runCommandSilent(`execute positioned ${victim.x} ${victim.y} ${victim.z} run ${command}`)
        })

        .icon(palladium.createItemIcon("minecraft:stick"));
});