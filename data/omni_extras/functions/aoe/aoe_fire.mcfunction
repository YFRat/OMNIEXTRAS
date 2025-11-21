execute as @s run tag @s add Ignore
playsound minecraft:entity.blaze.shoot master @p[distance=..6] ~ ~ ~ 10
execute as @e[distance=..6, tag=!Ignore] run data merge entity @s {Fire:120}
execute as @s run tag @s remove Ignore