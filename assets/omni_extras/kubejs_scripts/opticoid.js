PalladiumEvents.registerAnimations((event) => {
    event.register("oe/opticoid", 10, (builder) => {
        if (abilityUtil.isEnabled(builder.getPlayer(), "omni_extras:opticoid", "renderLayer")) {
            if (builder.isFirstPerson()) {
                builder.get("right_arm")
                    .setX(-2)
                    .setZ(2)
                    builder.get("left_arm")
                    .setX(2)
                    .setZ(2);
            }
            else {
                if (builder.getPlayer().isCrouching()) {
                    builder.get("head")
                        .moveZ(-4.3)
                        .moveY(-3.1);
                    builder.get("right_arm")
                        .setZ(-3.1)
                        .setY(2.4);
                    builder.get("left_arm")
                        .setZ(-3.1) //negative = forwards
                        .setY(2.4); //negative = higher placement
                    builder.get("right_leg")
                        .setZ(1)
                        .setY(10);
                    builder.get("left_leg")
                        .setZ(1)
                        .setY(10);
                    builder.get("chest")
                        .setZ(-5)
                        .setY(0.1);
                }
            }
        }
    });
});

PalladiumEvents.registerAnimations((event) => {
    event.register('eyeguy/normalbeam', 100, (builder) => {
        let normalbeam = animationUtil.getAnimationTimerAbilityValue(
            builder.getPlayer(), 'omni_extras:opticoid', 'normal_beam_timer', builder.getPartialTicks());
        if (normalbeam > 0 && !builder.isFirstPerson()) {
            builder.get("right_arm")
                    .setZRotDegrees(0)
                    .setXRotDegrees(0)
                    .setYRotDegrees(0)
                    .animate('easeOutBack', normalbeam)
            builder.get("left_arm")
                    .setZRotDegrees(0)
                    .setXRotDegrees(0)
                    .setYRotDegrees(0)
                    .animate('easeOutBack', normalbeam)
        }
        if (normalbeam > 0.0 && builder.isFirstPerson()) {


        }
    });
});
PalladiumEvents.registerAnimations((event) => {
    event.register('eyeguy/superbeam', 100, (builder) => {
        let superbeam = animationUtil.getAnimationTimerAbilityValue(
            builder.getPlayer(), 'omni_extras:opticoid', 'super_beam_timer', builder.getPartialTicks());
        if (superbeam > 0 && !builder.isFirstPerson()) {
            builder.get("right_arm")
                    .setZRotDegrees(0)
                    .setXRotDegrees(0)
                    .setYRotDegrees(0)
                    .animate('easeOutBack', superbeam)
            builder.get("left_arm")
                    .setZRotDegrees(0)
                    .setXRotDegrees(0)
                    .setYRotDegrees(0)
                    .animate('easeOutBack', superbeam)
        }
        if (superbeam > 0.0 && builder.isFirstPerson()) {


        }
    });
});