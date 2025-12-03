let LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity');
let BlockPos = Java.loadClass('net.minecraft.core.BlockPos');

function isCircle(x, y, z, r) {
    return (x * x + y * y + z * z) <= r * r;
}

let OFFSETS = [[-2, -1, -2], [-2, -1, -1], [-2, -1, 0], [-2, -1, 1], [-2, -1, 2], [-1, -1, -2], [-1, -1, -1], [-1, -1, 0], [-1, -1, 1], [-1, -1, 2], [0, -1, -2], [0, -1, -1], [0, -1, 0], [0, -1, 1], [0, -1, 2], [1, -1, -2], [1, -1, -1], [1, -1, 0], [1, -1, 1], [1, -1, 2], [2, -1, -2], [2, -1, -1], [2, -1, 0], [2, -1, 1], [2, -1, 2], [-2, 0, -2], [-2, 0, -1], [-2, 0, 0], [-2, 0, 1], [-2, 0, 2], [-1, 0, -2], [-1, 0, -1], [-1, 0, 0], [-1, 0, 1], [-1, 0, 2], [0, 0, -2], [0, 0, -1], [0, 0, 0], [0, 0, 1], [0, 0, 2], [1, 0, -2], [1, 0, -1], [1, 0, 0], [1, 0, 1], [1, 0, 2], [2, 0, -2], [2, 0, -1], [2, 0, 0], [2, 0, 1], [2, 0, 2], [-2, 1, -2], [-2, 1, -1], [-2, 1, 0], [-2, 1, 1], [-2, 1, 2], [-1, 1, -2], [-1, 1, -1], [-1, 1, 0], [-1, 1, 1], [-1, 1, 2], [0, 1, -2], [0, 1, -1], [0, 1, 0], [0, 1, 1], [0, 1, 2], [1, 1, -2], [1, 1, -1], [1, 1, 0], [1, 1, 1], [1, 1, 2], [2, 1, -2], [2, 1, -1], [2, 1, 0], [2, 1, 1], [2, 1, 2],];
StartupEvents.registry('palladium:abilities', event => {
    event.create('omni_extras:burrow_destroy')
        .icon(palladium.createItemIcon('minecraft:iron_shovel'))
        .addProperty("distance", "float", 5, "Ray distance")
        .addProperty("damage", "int", 5, "Damage to mob")
        .tick((entity, entry, holder, enabled) => {

            if (!enabled || !entity.isPlayer()) return;
            if (entity.level.isClientSide()) return;

            let maxDist = entry.getPropertyByName("distance");
            let dmg = entry.getPropertyByName("damage");

            let hit = entity.rayTrace(maxDist, false);
            if (!hit || !hit.block) return;

            let pos = hit.block;
            let cx = pos.getX();
            let cy = pos.getY();
            let cz = pos.getZ();

            for (let depth = 0; depth < 2; depth++) {

                let dz = depth;

                for (let off of OFFSETS) {

                    let ox = off[0];
                    let oy = off[1];
                    let oz = off[2];

                    if (!isCircle(ox, oy, oz, 2.5)) continue;

                    let bp = new BlockPos(cx + ox, cy + oy, cz + oz + dz);
                    let block = entity.level.getBlock(bp);
                    if (!block) continue;

                    let id = block.getId();
                    if (id === 'minecraft:air') continue;

                    entity.level.destroyBlock(bp, false);
                }
            }
        });
});
