EntityEvents.hurt(event => {
    if (!event.source.actual) return;
    if (event.source.actual.getType() !== 'palladium:custom_projectile') return;
    let hit = event.entity;
    let entity = event.source.actual;
    if (!entity.tags.contains('lightningstrike')) return;
    hit.potionEffects.add('minecraft:slowness', 10 * 20, 10, true, true);
});