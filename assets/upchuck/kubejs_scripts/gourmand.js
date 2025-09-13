PalladiumEvents.registerAnimations((event) => {
    event.register("upc/gourmand", 10, (builder) => {
        if (abilityUtil.isEnabled(builder.getPlayer(), "upchuck:gourmand", "render_layer")) {
            if (builder.isFirstPerson()) {
                builder.get("right_arm")
                    .setX(10)
                    .setZ(7)
                    .scaleX(1.4)
                    .scaleY(1.4)
                    .scaleZ(1.4);
            }
            else {
                if (builder.getPlayer().isCrouching()) {
                    builder.get("head")
                        .moveZ(-6)
                        .moveY(-5.7);
                    builder.get("right_arm")
                        .setZ(-4)
                        .setY(-1);
                    builder.get("left_arm")
                        .setZ(-4) //negative = forwards
                        .setY(-1); //negative = higher placement
                    builder.get("right_leg")
                        .setZ(1)
                        .setY(10);
                    builder.get("left_leg")
                        .setZ(1)
                        .setY(10);
                    builder.get("chest")
                        .setZ(-1.5)
                        .setY(-2.8);
                }
            }
        }
    });
});