StartupEvents.registry('item', event => {
  event.create('nosedeenian:nosedeenian_conduction_part')
    .maxStackSize(1)
    .rarity('rare')
    .modelJson({parent: 'nosedeenian:item/nosedeenian_conduction_part'})
    .useAnimation('block')
    .useDuration(itemstack => 1)
    .use((level, player, hand) => true)
    .finishUsing((itemstack, level, entity) => {
        if (palladium.superpowers.hasSuperpower(entity, 'nosedeenian_aliens:nosedeenian_conduction_part')) return
        else {
            palladium.superpowers.addSuperpower(entity, 'nosedeenian_aliens:nosedeenian_conduction_part');
            itemstack.shrink(1);
            return itemstack;
        }
    })
})