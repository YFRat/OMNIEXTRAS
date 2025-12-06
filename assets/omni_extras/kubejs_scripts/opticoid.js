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
    event.register('eyeguy/normalbeam_inair', 100, (builder) => {
        let normalbeam = animationUtil.getAnimationTimerAbilityValue(
            builder.getPlayer(), 'omni_extras:opticoid', 'normal_air_timer', builder.getPartialTicks());
        if (normalbeam > 0 && !builder.isFirstPerson()) {
            builder.get("head")
                .moveZ(1)
            builder.get("right_arm")
                .setZ(4)
                .setY(-0.6)
                .setX(-6.4)
                .setZRotDegrees(40)
                .setXRotDegrees(20)
                .setYRotDegrees(-10)
                .animate('easeOutBack', normalbeam)
            builder.get("chest")
                .setZRotDegrees(0)
                .setXRotDegrees(80)
                .animate('easeOutBack', normalbeam)
            builder.get("left_arm")
                .setZ(3.6)
                .setY(-0.6)
                .setX(6.4)
                .setZRotDegrees(-60)
                .setXRotDegrees(20)
                .setYRotDegrees(-10)
                .animate('easeOutBack', normalbeam)
            builder.get("right_leg")
                .setZ(13)
                .setY(2)
                .setXRotDegrees(80)
                .setYRotDegrees(-10)
                .animate('easeOutBack', normalbeam)
            builder.get("left_leg")
                .setZ(13)
                .setY(2)
                .setXRotDegrees(80)
                .setYRotDegrees(10)
                .animate('easeOutBack', normalbeam)
        }
        if (normalbeam > 0.0 && builder.isFirstPerson()) {


        }
    });
});
PalladiumEvents.registerAnimations((event) => {
    event.register('eyeguy/superbeam_inair', 100, (builder) => {
        let normalbeam = animationUtil.getAnimationTimerAbilityValue(
            builder.getPlayer(), 'omni_extras:opticoid', 'super_air_timer', builder.getPartialTicks());
        if (normalbeam > 0 && !builder.isFirstPerson()) {
            builder.get("head")
                .moveZ(1)
            builder.get("right_arm")
                .setZ(4)
                .setY(-0.6)
                .setX(-4.2)
                .setZRotDegrees(40)
                .setXRotDegrees(20)
                .setYRotDegrees(-10)
                .animate('easeOutBack', normalbeam)
            builder.get("chest")
                .setZRotDegrees(0)
                .setXRotDegrees(80)
                .animate('easeOutBack', normalbeam)
            builder.get("left_arm")
                .setZ(3.6)
                .setY(-0.6)
                .setX(4.2)
                .setZRotDegrees(-60)
                .setXRotDegrees(20)
                .setYRotDegrees(-10)
                .animate('easeOutBack', normalbeam)
            builder.get("right_leg")
                .setZ(13)
                .setY(2)
                .setXRotDegrees(80)
                .setYRotDegrees(-10)
                .animate('easeOutBack', normalbeam)
            builder.get("left_leg")
                .setZ(13)
                .setY(2)
                .setXRotDegrees(80)
                .setYRotDegrees(10)
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