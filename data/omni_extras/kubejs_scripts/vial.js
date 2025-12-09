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

ItemEvents.rightClicked('omni_extras:opticoid_vial', e => {
  const item = e.item;
  const player = e.player;

  if (hasOmnitrix(player) && !hasAlien(player, 110)) {
    player.addTag('Opticoid.Grant');
    if (getOmnitrixId(player) == "alienevo:prototype_omnitrix") {
      item.count--;
      palladium.superpowers.removeSuperpower(player, "alienevo:prototype_omnitrix");
      palladium.superpowers.addSuperpower(player, "omni_extras:not_aliens/proto_scan_mode");
      player.level.playSound(null, player.x, player.y, player.z, "minecraft:block.glass.break", "players", 6, 1.2);
    }
    else if (getOmnitrixId(player) == "alienevo:recal_omnitrix") {
      item.count--;
      palladium.superpowers.removeSuperpower(player, "alienevo:recal_omnitrix");
      palladium.superpowers.addSuperpower(player, "omni_extras:not_aliens/recal_scan_mode");
      player.level.playSound(null, player.x, player.y, player.z, "minecraft:block.glass.break", "players", 6, 1.2);
    }
    else if (getOmnitrixId(player) == "alienevo:ult_omnitrix") {
      item.count--;
      palladium.superpowers.removeSuperpower(player, "alienevo:ult_omnitrix");
      palladium.superpowers.addSuperpower(player, "omni_extras:not_aliens/ultimatrix_scan_mode");
      player.level.playSound(null, player.x, player.y, player.z, "minecraft:block.glass.break", "players", 6, 1.2);
    }
    else {
      item.count--;
      player.runCommandSilent('function omni_extras:vialgrant')
      player.level.playSound(null, player.x, player.y, player.z, "minecraft:block.glass.break", "players", 6, 1.2);
    }
  }
  else if (hasOmnitrix(player) && hasAlien(player, 110)) {
    player.tell(Text.red("§lNothing happened"));
    player.level.playSound(null, player.x, player.y, player.z, "minecraft:block.note_block.bass", "players", 6, 0.1)
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

function getOmnitrixId(player) {
  let powers = palladium.powers.getPowerIds(player);

  if (!powers || powers.length === 0) return null;

  for (let powerId of powers) {
    let id = String(powerId);

    if (id.toLowerCase().includes("omnitrix")) {
      return id;
    }
  }

  return null;
}