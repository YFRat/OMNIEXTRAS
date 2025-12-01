execute as @s[x_rotation=80..90] run tag @s add Opticoid.Boost
execute as @s unless entity @s[x_rotation=80..90] run tag @s remove Opticoid.Boost
