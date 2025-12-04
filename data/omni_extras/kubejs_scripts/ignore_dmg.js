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
    if (event.source == 'DamageSource (fall)' && event.entity.isPlayer() && abilityUtil.isEnabled(event.entity, 'omni_extras:perkgourmand', 'gourmand_loop')) {
        if (event.entity.fallDistance > 15) {
            palladium.superpowers.addSuperpower(event.entity, "omni_extras:not_aliens/flatten_modified");
        }
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

EntityEvents.hurt((event) => {
    if (event.source == 'DamageSource (inWall)' && event.entity.isPlayer() && abilityUtil.isEnabled(event.entity, 'omni_extras:talpaedan', 'talpaedan_loop')) {
        event.cancel();
    }
});
/* EntityEvents.hurt((event) => {
    let dmgtype = event.source.getType()
    let entity = event.entity

    entity.tell(Text.of(dmgtype))
});
*/
