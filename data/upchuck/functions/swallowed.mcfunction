# summon dummy inside player
summon minecraft:armor_stand ~ ~ ~ {NoGravity:1b,Invisible:1b,Invulnerable:1b,Tags:["SwallowDummy"]}

# mount the dummy on the Upchuck player
execute as @e[tag=SwallowDummy,limit=1,sort=nearest] run ride @s mount @p[tag=Upchuck]

# hide the victim + tag them
execute at @s as @e[distance=0..8,type=!minecraft:armor_stand,tag=!Upchuck,limit=1,sort=nearest] run effect give @s minecraft:invisibility 5s 0 true
execute at @s as @e[distance=0..8,type=!minecraft:armor_stand,tag=!Upchuck,limit=1,sort=nearest] run tag @s add Swallowed

# schedule spit out
schedule function upchuck:spit 5s
