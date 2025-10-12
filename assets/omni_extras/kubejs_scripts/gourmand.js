PalladiumEvents.registerAnimations((event) => {
    event.register("upc/gourmand", 10, (builder) => {
        if (abilityUtil.isEnabled(builder.getPlayer(), "omni_extras:gourmand", "render_layer")) {
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
            builder.getPlayer(), 'omni_extras:gourmand', 'whip_timer_arms', builder.getPartialTicks());
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
            builder.getPlayer(), 'omni_extras:gourmand', 'sickness_timer', builder.getPartialTicks(), 1, 13);
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
    event.register('gourmand/swallow', 100, (builder) => {
        let fix = animationUtil.getAnimationTimerAbilityValue(
            builder.getPlayer(), 'omni_extras:gourmand', 'yummy_in_my_tummy', builder.getPartialTicks(), 1, 5);
        if (fix > 0 && !builder.isFirstPerson()) {
            builder.get('right_arm')
                .setZRotDegrees(0)
                .setXRotDegrees(0)
                .setYRotDegrees(0)
                .animate('easeOutBack', fix);
            builder.get('left_arm')
                .setZRotDegrees(0)
                .setXRotDegrees(0)
                .setYRotDegrees(0)
                .animate('easeOutBack', fix);
        }
        if (fix > 0.0 && builder.isFirstPerson()) {
           
        }
    });
});

PalladiumEvents.registerAnimations((event) => {
    event.register('gourmand/tongue_whip', 40, (builder) => {
        let spinwhip = animationUtil.getAnimationTimerAbilityValue(
            builder.getPlayer(), 'omni_extras:gourmand', 'whip_timer', builder.getPartialTicks());
        if (spinwhip > 0 && !builder.isFirstPerson()) {
            builder.get('body').rotateYDegrees(-360 * 3).animate('easeInOutSine', spinwhip);

        }
        if (spinwhip > 0.0 && builder.isFirstPerson()) {


        }
    });
});
ClientEvents.tick(event => {
    const player = event.player;
    if (!abilityUtil.hasPower(player, "omni_extras:gourmand")) return;

    const cam = Client.options.getCameraType();
    const data = player.persistentData;
    const frontView = [
        ["omni_extras:not_aliens/destruction", "destruction_timer", "third_person_front"],
        ["omni_extras:gourmand", "whip_timer", "third_person_back"]
    ];
    let active = false;
    let desiredMode = "first_person";

    for (const [power, ability, cameraMode] of frontView) {
        if (abilityUtil.isEnabled(player, power, ability)) {
            active = true;
            desiredMode = cameraMode;
            break;
        }
    }
    if (active) {
        if (cam !== desiredMode) {
            data.camera_reset = 1;
            Client.options.setCameraType(desiredMode);
        }
    } else if (data.camera_reset === 1) {
        data.camera_reset = 0;
        Client.options.setCameraType("first_person");
    }
});
