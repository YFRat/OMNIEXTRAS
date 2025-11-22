EntityEvents.hurt((event) => {
    if (event.source == 'DamageSource (thrown)' && event.entity.isPlayer() && abilityUtil.isEnabled(event.entity, 'omni_extras:opticoid', 'opticoid_loop')) {
        event.cancel(); 
    }
});

EntityEvents.hurt((event) => {
    if (event.source == 'DamageSource (thrown)' && event.entity.isPlayer() && abilityUtil.isEnabled(event.entity, 'omni_extras:perkgourmand', 'gourmand_loop')) {
        event.cancel(); 
    }
});

EntityEvents.hurt((event) => {
    if (event.source == 'DamageSource (thrown)' && event.entity.isPlayer() && abilityUtil.isEnabled(event.entity, 'omni_extras:murkgourmand', 'gourmand_loop')) {
        event.cancel(); 
    }
});

EntityEvents.hurt((event) => {
    if (event.source == 'DamageSource (fall)' && event.entity.isPlayer() && abilityUtil.isEnabled(event.entity, 'omni_extras:opticoid', 'opticoid_loop')) {
        if (event.entity.fallDistance < 14) {
            event.cancel(); 
        }
    }
});