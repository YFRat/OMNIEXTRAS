let LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity');

function isCircle(x, y, z, r) {
    return (x * x + z * z) <= r * r;
}

let caveIn = [
    [0, 0, 0],

    [-1, 0, 0], [1, 0, 0], [0, 0, -1], [0, 0, 1],
    [-2, 0, 0], [2, 0, 0], [0, 0, -2], [0, 0, 2],
    [-1, 0, -1], [-1, 0, 1], [1, 0, -1], [1, 0, 1],

    [0, 1, 0],
    [-1, 1, 0], [1, 1, 0], [0, 1, -1], [0, 1, 1],
    [-2, 1, 0], [2, 1, 0], [0, 1, -2], [0, 1, 2],
    [-1, 1, -1], [-1, 1, 1], [1, 1, -1], [1, 1, 1],

    [0, 2, 0],
    [-1, 2, 0], [1, 2, 0], [0, 2, -1], [0, 2, 1],
    [-2, 2, 0], [2, 2, 0], [0, 2, -2], [0, 2, 2],
    [-1, 2, -1], [-1, 2, 1], [1, 2, -1], [1, 2, 1],
];

let threeXthree = [
    [-1, 0, -1], [0, 0, -1], [1, 0, -1],
    [-1, 0, 0], [0, 0, 0], [1, 0, 0],
    [-1, 0, 1], [0, 0, 1], [1, 0, 1],
];
function drillBlocks(entity, centerX, centerY, centerZ, offsets, radius) {
    let BlockPos = Java.loadClass('net.minecraft.core.BlockPos');

    offsets.forEach(off => {
        let ox = off[0];
        let oy = off[1];
        let oz = off[2];

        if (radius != null && !isCircle(ox, oy, oz, radius)) return;

        let bp = new BlockPos(centerX + ox, centerY + oy, centerZ + oz);
        let block = entity.level.getBlock(bp);

        if (!block) return;
        if (block.getId() === "minecraft:air") return;
        if (block.hasTag("alienevo:unminable")) return;

        entity.level.destroyBlock(bp, true);
    });
}


StartupEvents.registry('palladium:abilities', event => {
    event.create('omni_extras:burrow_destroy')
        .icon(palladium.createItemIcon('minecraft:iron_shovel'))
        .addProperty("distance", "float", 5, "Ray distance")
        .addProperty("drill_shape", "string", "caving_in", "shape of the drill")
        .tick((entity, entry, holder, enabled) => {

            if (!enabled || !entity.isPlayer()) return;
            if (entity.level.isClientSide()) return;

            let maxDist = entry.getPropertyByName("distance");
            let drillShape = entry.getPropertyByName("drill_shape");

            let hit = entity.rayTrace(maxDist, false);
            if (!hit || !hit.block) return;

            let pos = hit.block;
            let cx = pos.getX();
            let cy = pos.getY();
            let cz = pos.getZ();

            if (drillShape === "3x3") {
                drillBlocks(entity, cx, cy, cz, threeXthree, null);

            }
            else if (drillShape === "caving_in") {
                drillBlocks(entity, cx, cy, cz, caveIn, 2.5);

            }
        });
});
