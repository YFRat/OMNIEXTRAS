PalladiumEvents.registerAnimations((event) => {
    event.register('nosedeenian_anim', 10, (builder) => {
        if (abilityUtil.isEnabled(builder.getPlayer(), 'nosedeenian_aliens:nosedeenian', 'nosedeenian_loop')) {
            if (builder.isFirstPerson()) {
                builder.get('left_arm')
                .setX(3)
                .setZ(5)

                builder.get('right_arm')
                .setX(3)
                .setZ(5)

            } 
        }
    });
});
//Original made by Alien Evo developers.
ClientEvents.tick(event => {
    if (abilityUtil.hasPower(event.player, "nosedeenian_aliens:nosedeenian")) {
        // Check if either ability is enabled
        let kickDashActive = abilityUtil.isEnabled(event.player, "nosedeenian_aliens:nosedeenian", "kick_dash_anim");
        let motionDamageActive = abilityUtil.isEnabled(event.player,  "nosedeenian_aliens:nosedeenian", "invis");

        if (kickDashActive || motionDamageActive) {
            let mode = Client.options.getCameraType();
            if (mode !== 'third_person_back' && mode !== 'third_person_front') {
                event.player.persistentData.camera_reset = 1;
                Client.options.setCameraType('third_person_back');
            }
        }

        let end = event.player.persistentData.camera_reset;
        if (!kickDashActive && !motionDamageActive && end === 1) {
            event.player.persistentData.camera_reset = 0;
            Client.options.setCameraType('first_person');
        }
    }
})