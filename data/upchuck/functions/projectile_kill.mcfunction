tellraw @s {"text":"Projectiles near you — clearing projectiles","color":"yellow"}

kill @e[type=minecraft:arrow,distance=..3]
kill @e[type=minecraft:fireball,distance=..3]
kill @e[type=palladium:custom_projectile,distance=..3]
kill @e[type=minecraft:small_fireball,distance=..3]

energybar value add @s upchuck:gourmand stomach 150