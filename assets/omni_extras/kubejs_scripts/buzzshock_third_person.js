ClientEvents.tick(event => {
    if (abilityUtil.hasPower(event.player, "nosedeenian_aliens:nosedeenian")) {
        // Check if either ability is enabled
        let punchBarrage = abilityUtil.isEnabled(event.player, "nosedeenian_aliens:nosedeenian", "punch_barrage");
        let motionDamageActive = abilityUtil.isEnabled(event.player, "nosedeenian_aliens:nosedeenian", "invis");

        if (punchBarrage || motionDamageActive) {
            let mode = Client.options.getCameraType();
            if (mode !== 'third_person_back' && mode !== 'third_person_front') {
                event.player.persistentData.camera_reset = 1;
                Client.options.setCameraType('third_person_back');
            }
        }

        let end = event.player.persistentData.camera_reset;
        if (!punchBarrage && !motionDamageActive && end === 1) {
            event.player.persistentData.camera_reset = 0;
            Client.options.setCameraType('first_person');
        }
    }
});