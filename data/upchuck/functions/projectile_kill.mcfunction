# This runs as the player (@s) because the dispatcher executed it as the player
tellraw @s {"text":"Projectiles near you — clearing projectiles","color":"yellow"}

# Kill nearby projectiles (distance is relative to player)
kill @e[type=minecraft:arrow,distance=..3]
kill @e[type=minecraft:fireball,distance=..3]
kill @e[type=palladium:custom_projectile,distance=..3]

# reward
energybar value add @s upchuck:gourmand stomach 150