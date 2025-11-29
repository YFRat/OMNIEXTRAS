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
        if (hasOmnitrix(player) && !hasAlien(player, 110)) {
            item.count--;
            player.runCommandSilent('function omni_extras:vialgrant');
      }
        else {
          player.tell(Text.red("§lNothing happened"));
          player.level.playSound(null, player.x, player.y, player.z, "minecraft:block.note_block.bass", "master", 10, 0.1)
      }
    }
});

function hasOmnitrix(player) {
  let currentPowers = palladium.powers.getPowerIds(player);
  if (currentPowers && currentPowers.length > 0) {
    for (let powerId of currentPowers) {
      let powerIdStr = String(powerId).toLowerCase();
      if (powerIdStr.includes('omnitrix')) {
        return true;
      }
    }
  } 
  return false; //made by the goat beans
}

function hasAlien(player, alienId) {
  for (let playlist = 1; playlist <= 10; playlist++) {
    for (let slot = 1; slot <= 10; slot++) {
      let alienKey = `alienevo.alien_${playlist}_${slot}`;
      let storedAlienId = player.persistentData.getInt(alienKey);
      if (storedAlienId === alienId) {
        return true;
      }
    }
  }
  return false; //made by the goat beans
}