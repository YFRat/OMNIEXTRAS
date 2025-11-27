let ClientboundSetEntityMotionPacket = Java.loadClass('net.minecraft.network.protocol.game.ClientboundSetEntityMotionPacket');

StartupEvents.registry("palladium:abilities", event => {
  event.create("nosedeenian:entity_motion")
    .icon(palladium.createItemIcon('minecraft:egg'))
    .documentationDescription('Gives motion to what the player is looking at.')
    .addProperty("range", "float", 0.0, "Range of the ability")
    .addProperty("motion_scale", "float", 1, "Motion Scale")
    .tick((entity, entry, holder, enabled) => {
      if (enabled) {
        const motionscale = entry.getPropertyByName("motion_scale")
        const range = entry.getPropertyByName('range');

        let target = entity.rayTrace(range).entity;
        if (target !== null) {
          let motion = entity.getLookAngle().scale(motionscale);
          target.setDeltaMovement(motion);

          if (target.isPlayer()) {
            target.connection.send(new ClientboundSetEntityMotionPacket(target));
          }
        }
      }
    })
});