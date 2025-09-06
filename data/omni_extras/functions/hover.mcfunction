execute as @s[x_rotation=80..90] run tag @s add Opticoid.Hover
execute as @s unless entity @s[x_rotation=80..90] run tag @s remove Opticoid.Hover
execute as @s run effect give @s[x_rotation=80..90] slow_falling 1 0 true
