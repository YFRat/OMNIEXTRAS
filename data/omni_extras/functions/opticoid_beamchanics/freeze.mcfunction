execute as @e[tag=!Opticoid,distance=..10] if entity @s[nbt=!{HurtTime:0s}] run effect give @s alienevo:freeze_effect 5 7 true
execute as @e[tag=!Opticoid,distance=..10] if entity @s[nbt=!{HurtTime:0s}] run effect give @s minecraft:slowness 5 7 true
execute as @e[tag=!Opticoid,distance=..10] if entity @s[nbt=!{HurtTime:0s}] run data merge entity @s {Fire:-1}