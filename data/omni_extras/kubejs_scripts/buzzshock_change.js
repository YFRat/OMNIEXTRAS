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

EntityEvents.hurt(event => {
  let player = event.entity
  let watchId = palladium.getProperty(player, 'watch');
    
    if (hasOmnitrix(player), !hasAlien(player, 299), event.source == 'DamageSource (lightningBolt)' && player.isPlayer() && hasOmnitrix(player)) {
        let omnitrixId = getOmnitrixId(player);

        palladium.setProperty(player, 'omnitrix_cycle', 299)
        player.level.playSound(null, player.x, player.y, player.z, `alienevo:${watchId}_transform`, "players", 10, 1)
        player.level.playSound(null, player.x, player.y, player.z, "omni_extras:laugh", "players", 10, 1)
        player.runCommandSilent(`function omni_extras:nosedeenian_obtain`)
        player.runCommandSilent(`superpower replace ${omnitrixId} omni_extras:nosedeenian ${player.name.string}`);
        player.extinguish()
    }   

})