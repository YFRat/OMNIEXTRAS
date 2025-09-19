ServerEvents.recipes(event => {
  event.smelting('omni_extras:opticoid_vial', 'omni_extras:filled_vial')
   .xp(1.0)        // sets XP (float)
   .cookingTime(300); // sets smelting time in ticks (300 = 15s)
})