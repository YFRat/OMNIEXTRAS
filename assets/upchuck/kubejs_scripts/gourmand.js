PalladiumEvents.registerAnimations((event) => {
    event.register("upc/gourmand", 10, (builder) => {
        if (abilityUtil.isEnabled(builder.getPlayer(), "upchuck:gourmand", "render_layer")) {
            if (builder.isFirstPerson()) {
                builder.get("right_arm")
                    .setX(12)
                    .setZ(10)
                    .scaleX(1.4)
                    .scaleY(1.4)
                    .scaleZ(1.4);
            }
            else {
                if (builder.getPlayer().isCrouching()) {
                    builder.get("head")
                        .moveZ(-4)
                        .moveY(-5.4);
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
PalladiumEvents.registerAnimations((event) => {
    event.register('gourmand/tongue_whip_arms', 40, (builder) => {
        let spinwhip = animationUtil.getAnimationTimerAbilityValue(
            builder.getPlayer(), 'upchuck:gourmand', 'whip_timer_arms', builder.getPartialTicks());
        if (spinwhip > 0 && !builder.isFirstPerson()) {
            builder.get('right_arm')
                .rotateZDegrees(10)
                .setXRotDegrees(0)
                .animate('easeOutBack', spinwhip);
            builder.get('left_arm')
                .rotateZDegrees(-10)
                .setXRotDegrees(0)
                .animate('easeOutBack', spinwhip);
            builder.get('left_leg')
                .setXRotDegrees(0)
                .setYRotDegrees(0)
                .setZRotDegrees(0)
                .animate('easeOutBack', spinwhip);
            builder.get('right_leg')
                .setXRotDegrees(0)
                .setYRotDegrees(0)
                .setZRotDegrees(0)
                .animate('easeOutBack', spinwhip);
        }
        if (spinwhip > 0.0 && builder.isFirstPerson()) {


        }
    });
});

PalladiumEvents.registerAnimations((event) => {
    event.register('gourmand/sick', 100, (builder) => {
        let sick = animationUtil.getAnimationTimerAbilityValue(
            builder.getPlayer(), 'upchuck:gourmand', 'sickness_timer', builder.getPartialTicks(), 1, 13);
        if (sick > 0 && !builder.isFirstPerson()) {
            builder.get('right_arm')
                .setZRotDegrees(-14)
                .setXRotDegrees(-30)
                .setYRotDegrees(-42)
                .animate('easeOutBack', sick);
            builder.get('left_arm')
                .setZRotDegrees(14)
                .setXRotDegrees(-30)
                .setYRotDegrees(42)
                .animate('easeOutBack', sick);
            builder.get('body')
                .setY(-4)
                .animate('easeOutBack', sick);
            builder.get('left_leg')
                .setXRotDegrees(-71)
                .setYRotDegrees(-14)
                .setZRotDegrees(-4)
                .setZ(-2)
                .setY(11)
                .animate('easeOutBack', sick);
            builder.get('right_leg')
                .setXRotDegrees(-76)
                .setYRotDegrees(19)
                .setZRotDegrees(4)
                .setZ(-2)
                .setY(11)
                .animate('easeOutBack', sick);
        }
        if (sick > 0.0 && builder.isFirstPerson()) {
            builder.get('right_arm')
                .setZRotDegrees(-30)
                .setXRotDegrees(-10)
                .setYRotDegrees(-30)
                .setY(-6)
                .setX(3)
                .setZ(10)
                .animate('easeOutBack', sick);
        }
    });
});

PalladiumEvents.registerAnimations((event) => {
    event.register('gourmand/tongue_whip', 40, (builder) => {
        let spinwhip = animationUtil.getAnimationTimerAbilityValue(
            builder.getPlayer(), 'upchuck:gourmand', 'whip_timer', builder.getPartialTicks());
        if (spinwhip > 0 && !builder.isFirstPerson()) {
            builder.get('body').rotateYDegrees(-360 * 3).animate('easeInOutSine', spinwhip);

        }
        if (spinwhip > 0.0 && builder.isFirstPerson()) {


        }
    });
});
ClientEvents.tick(event => {
    if (abilityUtil.hasPower(event.player, "upchuck:gourmand")) {
        if (abilityUtil.isEnabled(event.player, "upchuck:gourmand", "whip_timer")) {
            let mode = Client.options.getCameraType();
            if (mode !== 'third_person_back' && mode !== 'third_person_front') {
                event.player.persistentData.camera_reset = 1;
                Client.options.setCameraType('third_person_back');
            }
        }

        let end = event.player.persistentData.camera_reset;
        if (!abilityUtil.isEnabled(event.player, "upchuck:gourmand", "whip_timer") && end === 1) {
            event.player.persistentData.camera_reset = 0;
            Client.options.setCameraType('first_person');
        }
    }
});