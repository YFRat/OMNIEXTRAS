execute positioned ~ ~1 ~ positioned ^ ^ ^1 unless block ~ ~ ~ air align xyz positioned ~ ~0.7 ~ run function upchuck:mining_mod/destroy
execute unless entity @s[tag=Destroy] positioned ~ ~1 ~ positioned ^ ^ ^2 unless block ~ ~ ~ air align xyz positioned ~ ~0.7 ~ run function upchuck:mining_mod/destroy
execute unless entity @s[tag=Destroy] positioned ~ ~1 ~ positioned ^ ^ ^3 unless block ~ ~ ~ air align xyz positioned ~ ~0.7 ~ run function upchuck:mining_mod/destroy
execute unless entity @s[tag=Destroy] run function upchuck:projectile_detect
tag @s remove Destroy_mod