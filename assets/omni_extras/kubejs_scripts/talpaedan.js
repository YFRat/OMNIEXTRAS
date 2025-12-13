PalladiumEvents.registerAnimations((event) => {
    event.register("oe/talpaedan", 10, (builder) => {
        if (abilityUtil.isEnabled(builder.getPlayer(), "omni_extras:talpaedan", "renderLayer")) {
            if (builder.isFirstPerson()) {
                builder.get("right_arm")
                    .setX(-2)
                    .setZ(2)
                builder.get("left_arm")
                    .setX(2)
                    .setZ(2);
            }
            else if (!builder.getPlayer().isCrouching()) {
                builder.get('head').rotateX((builder.getModel().head.xRot * -0.3))
            }
            else {
                if (builder.getPlayer().isCrouching()) {
                    builder.get("head")
                        .moveZ(-6.5)
                        .moveY(-2.5)
                        .rotateX((builder.getModel().head.xRot * -0.4))
                    builder.get("right_arm")
                        .moveZ(-5.6)
                        .moveY(-3)
                    builder.get("left_arm")
                        .moveZ(-5.6) //negative = forwards
                        .moveY(-3) //negative = higher placement
                    builder.get("right_leg")
                        .setZ(1)
                        .setY(10)
                    builder.get("left_leg")
                        .setZ(1)
                        .setY(10)
                    builder.get("chest")
                        .setZ(-4)
                        .setY(-0.55)
                }
            }
        }
    });
});

ClientEvents.tick(event => {
    const player = event.player;
    if (!abilityUtil.hasPower(player, "omni_extras:talpaedan")) return;

    const cam = Client.options.getCameraType();
    const data = player.persistentData;
    const frontView = [
        ["omni_extras:talpaedan", "earthquake_tag", "third_person_back"]
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
