PalladiumEvents.registerAnimations((event) => {
    event.register("etp/opticoid", 10, (builder) => {
        if (abilityUtil.isEnabled(builder.getPlayer(), "evo_test_pack_aliens:opticoid", "renderLayer")) {
            if (builder.isFirstPerson()) {
                builder.get("right_arm")
                    .setX(1.3)
                    .setZ(1.7);
            }
            else {
                if (builder.getPlayer().isCrouching()) {
                    builder.get("head")
                        .moveZ(-5.2)
                        .moveY(-3.7);
                    builder.get("right_arm")
                        .setZ(-6)
                        .setY(1);
                    builder.get("left_arm")
                        .setZ(-6) //negative = forwards
                        .setY(1); //negative = higher placement
                    builder.get("right_leg")
                        .setZ(1)
                        .setY(10);
                    builder.get("left_leg")
                        .setZ(1)
                        .setY(10);
                    builder.get("chest")
                        .setZ(-7)
                        .setY(-0.8);
                }
            }
        }
    });
});