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
  event.remove('omni_extras:granoall_bar');
  event.remove('omni_extras:wrapper');
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

StartupEvents.registry('item', event => {
    event.create('omni_extras:granoall_bar')
        .texture('omni_extras:item/granoallbar')
        .displayName('GranoAll Bar')
        .tooltip(`§5§l"This.. looks edible.."`)
        .rarity('uncommon')
        .food(food => 
            food
                .hunger(2)
                .saturation(1)
                .alwaysEdible()
        )
});
StartupEvents.registry('item', event => {
    event.create('omni_extras:wrapper')
        .texture('omni_extras:item/wrapper')
        .displayName('Wrapper')
        .rarity('common')
});

StartupEvents.registry('mob_effect', event => {
  event.create('omni_extras:overcharged')
    .color(Color.GREEN)
    .beneficial()
});
    
StartupEvents.registry('mob_effect', event => {
  event.create('omni_extras:electrocuted')
    .color(Color.YELLOW)
    .harmful()
});

StartupEvents.registry('mob_effect', event => {
  event.create('omni_extras:burning')
    .color(Color.RED)
    .harmful()
    .effectTick((entity, lvl) => { 
      if (entity.age % 20 != 0) return
      entity.setSecondsOnFire(3)
    })
});