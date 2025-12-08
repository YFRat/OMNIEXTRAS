PalladiumEvents.registerAnimations((event) => {
    event.register("oe/orishan", 10, (builder) => {
        if (abilityUtil.isEnabled(builder.getPlayer(), "omni_extras:orishan", "renderLayer")) {
            if (builder.isFirstPerson()) {
            }
            else {
                if (builder.getPlayer().isCrouching()) {
                    builder.get("head")
                        .moveZ(-6.8)
                        .moveY(-2.5);
                    builder.get("right_arm")
                        .setZ(-4.5)
                        .setY(2.5);
                    builder.get("left_arm")
                        .setZ(-4.5) //negative = forwards
                        .setY(2.5); //negative = higher placement
                    builder.get("right_leg")
                        .setZ(1)
                        .setY(10);
                    builder.get("left_leg")
                        .setZ(1)
                        .setY(10);
                    builder.get("chest")
                        .setZ(-4)
                        .setY(-0.5);
                }
            }
        }
    });
});
