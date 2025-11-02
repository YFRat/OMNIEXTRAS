const ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
StartupEvents.registry('palladium:condition_serializer', (event) => {
    event.create('omni_extras:has_effect')
        .addProperty('effect', 'string', 'minecraft:speed', 'The ID of the potion effect to check for.')
        .addProperty('minimum_level', 'integer', 0, 'level 1 = 0).')
        .test((entity, props) => {
            if (!props) {
                return false;
            }
            try {
                let effectId = props.get("effect");
                let effect = ForgeRegistries.MOB_EFFECTS.getValue(effectId);
                if (!effect) {
                    return false;
                }
                if (!entity.hasEffect(effect)) {
                    return false;
                }
                let activeEffect = entity.getEffect(effect);
                if (!activeEffect) {
                    return false;
                }
                let minAmplifier = props.get("minimum_level");
                let currentAmplifier = activeEffect.getAmplifier();
                if (currentAmplifier < minAmplifier) {
                    return false;
                }
                return true;
            } catch (error) {
                return false;
            }
        });
});
//Updated version with a minimum effect level
//Made by MrFuuu