execute as @s run tag @s add Ignore
playsound minecraft:block.glass.break master @p[distance=..6] ~ ~ ~ 10 1.6
execute as @s run effect give @e[distance=..6, tag=!Ignore] alienevo:freeze_effect 6 2
execute as @s run effect give @e[distance=..6, tag=!Ignore] minecraft:slowness 6 5
execute as @s run tag @s remove Ignore