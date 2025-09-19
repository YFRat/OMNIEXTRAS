StartupEvents.registry('block', event => {
    event.create('omni_extras:opticoid_slime')
        .displayName("Alien Goo")
        .soundType('honey_block')
        .opaque(true)
        .box(0, 0, 0, 16, 16, 16)
        .textureAll('omni_extras:block/opticoid_goo');
});