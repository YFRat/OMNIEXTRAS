PalladiumEvents.registerAnimations((event) => {
    event.register('alienevo/fakeactivationss', 200, (builder) => {
        let activation = animationUtil.getAnimationTimerAbilityValue(
            builder.getPlayer(), 'omni_extras:opticoid_scanned', 'rollcredits', builder.getPartialTicks());
        if (activation > 0 && !builder.isFirstPerson()) {
            builder.get('right_arm')
                .setXRotDegrees(-116)
                .setYRotDegrees(-38)
                .setZRotDegrees(57)
                .setX(-5 - 0.45)
                .setY(2 + 1.6)
                .setZ(0 + 0.675)
                .animate('easeOutBack', activation);
            builder.get('left_arm')
                .setXRotDegrees(-124)
                .setYRotDegrees(22)
                .setZRotDegrees(-115)
                .setX(5 + 1)
                .setY(2 + 2)
                .setZ(0 - 1.5)
                .animate('easeOutBack', activation);
        }

        if (activation > 0 && builder.isFirstPerson()) {
            builder.get('left_arm')
                .setXRotDegrees(-109)
                .setYRotDegrees(40)
                .setZRotDegrees(-39)
                .setX(12)
                .setY(9)
                .setZ(5)
                .animate('easeOutBack', activation);
            builder.get('right_arm')
                .setXRotDegrees(-79)
                .setYRotDegrees(-15)
                .setZRotDegrees(-8)
                .setX(-3.5)
                .setY(-1.6)
                .setZ(-2.1)
                .animate('easeOutBack', activation);
        }
    });
});
