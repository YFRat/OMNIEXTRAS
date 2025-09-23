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