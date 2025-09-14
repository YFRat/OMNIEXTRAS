# dismount & kill dummy
execute as @e[tag=SwallowDummy] run ride @s dismount
kill @e[tag=SwallowDummy]

# spit out swallowed entities in front of the Upchuck
execute as @e[tag=Swallowed] at @p[tag=Upchuck] positioned ^ ^ ^2 run tp @s ~ ~ ~

# remove tags
tag @e[tag=Swallowed] remove Swallowed
