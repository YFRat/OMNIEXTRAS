StartupEvents.registry('item', event =>{
    event.create('upchuck:mysterious_tablet')
    .unstackable()
    .texture(`upchuck:item/upchuck_tablet`)
    .food(food =>
        food
        .hunger(2)
        .saturation(0)
        .effect('minecraft:poison', 100, 0, 1)
        .alwaysEdible()
        .eaten(ctx => global.eatfunction(ctx))
    )
});
global.eatfunction = ctx => {
    ctx.player.tell(Text.green("I shouldn't have eaten that.."))
    return
};