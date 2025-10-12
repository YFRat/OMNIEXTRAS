StartupEvents.registry('block', event => {
    event.create('omni_extras:opticoid_slime')
        .displayName("Alien Goo")
        .soundType('honey_block')
        .opaque(true)
        .noDrops()
        .box(0, 0, 0, 16, 16, 16)
        .textureAll('omni_extras:block/opticoid_goo');
});

StartupEvents.modifyCreativeTab('kubejs:tab', event => {
  event.remove('omni_extras:opticoid_slime');
  event.remove('omni_extras:mysterious_tablet');
});

StartupEvents.registry('item', event => {
    event.create('omni_extras:mysterious_tablet')
        .unstackable()
        .texture('omni_extras:item/upchuck_tablet')
        .displayName('Tablet of Unknown Origin')
        .rarity('rare')
        .tooltip(`§5§l"Seems important.. I should hold on to it"`)
        .food(food => 
            food
                .hunger(2)
                .saturation(0)
                .alwaysEdible()
        )
});
