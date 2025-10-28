ServerEvents.recipes(event => {
  event.smelting('omni_extras:opticoid_vial', 'omni_extras:filled_vial')
   .xp(1.0)        
   .cookingTime(300); // sets smelting time in ticks (300 = 15s)
});

BlockEvents.rightClicked(event => {
    if (
        event.block.id == 'omni_extras:opticoid_slime' && event.item.id == 'omni_extras:empty_vial'
    ) {
        event.block.set('minecraft:air');
        event.item.count--;
        event.player.give('omni_extras:filled_vial');
        event.cancel();
        
    }
});

ItemEvents.rightClicked(e =>{
    const item = e.item;
    const player = e.player;
    if (item.id === 'omni_extras:opticoid_vial') {
        if (hasOmnitrix(player)) {
            item.count--;
            player.runCommandSilent('function omni_extras:vialgrant');
        }
    }
});

function hasOmnitrix(player) {
  return [
    'alienevo:prototype_omnitrix',
    'evo_reds_alienpack_noncustom:recal_omnitrix',
    'evo_reds_alienpack_bug:prototype_omnitrix',
    'evo_reds_alienpack_ult_noncustom:ult_omnitrix',
    'evo_reds_alienpack_ult:ult_omnitrix',
    'evo_reds_alienpack:recal_omnitrix',
    'evo_reds_alienpack_completed:completed_omnitrix',
    'aeo:omniverse_omnitrix'
  ].some(p => palladium.superpowers.hasSuperpower(player, p));
}