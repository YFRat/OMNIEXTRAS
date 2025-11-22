execute as @s run tag @s add Ignore
playsound minecraft:entity.blaze.shoot master @p[distance=..6] ~ ~ ~ 10
effect give @e[distance=..6, tag=!Ignore] omni_extras:burning 6 1 true
execute as @s run tag @s remove Ignore