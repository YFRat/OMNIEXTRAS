function easeOutElastic(t, bounciness) {
    var p = bounciness * 3.14159;
    var elasticIn = 1 - Math.pow(Math.cos(((1 - t) * 3.14159) / 2), 3) * Math.cos((1 - t) * p);
    return 1 - elasticIn;
}

PalladiumEvents.registerAnimations((event) => {
    event.registerForPower('proto_scan_mode/look', 'omni_extras:not_aliens/proto_scan_mode', 200, (builder) => {
        let activation = animationUtil.getAnimationTimerAbilityValue(
            builder.getPlayer(), 'omni_extras:not_aliens/proto_scan_mode', 'dummy', builder.getPartialTicks());
        if (activation > 0 && !builder.isFirstPerson()) {
            builder.get('left_arm')
                .setXRotDegrees(-124)
                .setYRotDegrees(22)
                .setZRotDegrees(-115)
                .setX(5 + 1)
                .setY(2 + 2)
                .setZ(0 - 1.5)
                .animate('easeOutBack', activation);
        }
        if (activation > 0.0 && builder.isFirstPerson()) {
            builder.get('left_arm')
                .setXRotDegrees(-109)
                .setYRotDegrees(40)
                .setZRotDegrees(-39)
                .setX(12)
                .setY(9)
                .setZ(5)
                .animate('easeOutBack', activation);
        }
    });
});

PalladiumEvents.registerAnimations((event) => {
    event.registerForPower('recal_scan_mode/look', 'omni_extras:not_aliens/recal_scan_mode', 200, (builder) => {
        let activation = animationUtil.getAnimationTimerAbilityValue(
            builder.getPlayer(), 'omni_extras:not_aliens/recal_scan_mode', 'dummy', builder.getPartialTicks());
        if (activation > 0 && !builder.isFirstPerson()) {
            builder.get('left_arm')
                .setXRotDegrees(-124)
                .setYRotDegrees(22)
                .setZRotDegrees(-115)
                .setX(5 + 1)
                .setY(2 + 2)
                .setZ(0 - 1.5)
                .animate('easeOutBack', activation);
        }
        if (activation > 0.0 && builder.isFirstPerson()) {
            builder.get('left_arm')
                .setXRotDegrees(-109)
                .setYRotDegrees(40)
                .setZRotDegrees(-39)
                .setX(12)
                .setY(9)
                .setZ(5)
                .animate('easeOutBack', activation);
        }
    });
});