StartupEvents.registry('item', event => {
    event.create('upchuck:mysterious_tablet')
        .unstackable()
        .texture('upchuck:item/upchuck_tablet')
        .displayName('Tablet of Unknown Origin')
        .rarity('rare')
        .food(food => 
            food
                .hunger(2)
                .saturation(0)
                .alwaysEdible()
        )
});

StartupEvents.modifyCreativeTab('kubejs:tab', event => {
  event.remove('upchuck:mysterious_tablet');
});