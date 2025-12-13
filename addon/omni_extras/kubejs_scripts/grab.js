let $Util = Java.loadClass("net.minecraft.Util");
let ClientboundSetEntityMotionPacket = Java.loadClass('net.minecraft.network.protocol.game.ClientboundSetEntityMotionPacket');

StartupEvents.registry("palladium:abilities", event => {
    event.create("omni_extras:grab")
        .icon(palladium.createItemIcon("minecraft:player_head"))
        .documentationDescription("Grab entities")
        .addProperty("scrollable", "boolean", false, "For if you intend to use the tele_valchange ability to make this scrollable.")
        .addProperty("damage", "float", 2, "The damage to apply when hitting an entity via telekinesis.")
        .addProperty("range", "integer", 8, "The default range of the ability.")
        .addProperty("strength", "float", 0.8, "The default strength/speed of the telekinesis.")
        .addUniqueProperty("held_entity", "uuid", $Util.NIL_UUID)
        .addUniqueProperty("cur_range", "integer", 8)
        .addUniqueProperty("cur_strength", "float", 0.8)
        .firstTick((entity, entry, holder, enabled) => {
            const range = entry.getPropertyByName(`scrollable`) == false ? `range` : `cur_range`;
            if (enabled) {
                let rayTrace = entity.rayTrace(entry.getPropertyByName(range), false);
                if (rayTrace.entity != null) {
                    entry.setUniquePropertyByName(`held_entity`, rayTrace.entity.uuid);
                }
            }
        })
        .tick((entity, entry, holder, enabled) => {
            const range = entry.getPropertyByName(`scrollable`) == false ? `range` : `cur_range`;
            const strength = entry.getPropertyByName(`scrollable`) == false ? `strength` : `cur_strength`;
            if (enabled) {
                let heldEntity = getHeldEntity(entity.level, entry);
                if (heldEntity == null) return;
                let targetPos = entity.getEyePosition().add(entity.getLookAngle().scale(entry.getPropertyByName(range)));
                heldEntity.setDeltaMovement(targetPos.subtract(heldEntity.getEyePosition()).scale(entry.getPropertyByName(strength)));
                heldEntity.resetFallDistance();

            }
        })
        .lastTick((entity, entry, holder, enabled) => {
            entry.setUniquePropertyByName(`held_entity`, $Util.NIL_UUID);
        });
});

function getHeldEntity(level, entry) {
    let uuid = entry.getPropertyByName(`held_entity`);
    if (uuid == $Util.NIL_UUID) return;
    return getEntity(level, uuid);
}

function getEntity(level, uuid) {
    if (uuid == null || uuid == $Util.NIL_UUID) return null;
    let entities = level.getEntities();
    for (let i = 0; i < entities.size(); i++) {
        if (entities.get(i).uuid.equals(uuid)) {
            return entities.get(i);
        }
    }
}

StartupEvents.registry('palladium:abilities', (event) => {
    event.create('omni_extras:tectonic_punch')
        .icon(palladium.createItemIcon('palladium:vibranium_circuit'))
        .addProperty("motion", "float", 1, "Motion")
        .addProperty("debug", "boolean", false, "bugbug")
        .firstTick((entity, entry, holder, enabled) => {
            if (enabled) {
                let motion = entry.getPropertyByName("motion");
                let debug = entry.getPropertyByName("debug");
                let angle = entity.getLookAngle().scale(motion);

                if (debug) {
                    entity.tell("§a[Tectonic Punch] Launching entity with motion");
                }
                let ray = entity.rayTrace(4, false);
                if (!ray || !ray.entity) {
                    return;
                }
                let target = ray.entity;
                target.setDeltaMovement(angle);
                if (target.isPlayer()) {
                    target.connection.send(new ClientboundSetEntityMotionPacket(target));
                }
            }
        });
});
