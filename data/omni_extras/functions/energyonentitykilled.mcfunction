execute if entity @s[tag=Nosedeenian.OverchargeLoad] run scoreboard players add @s Nosedeenian.Release 100
execute if score @s Nosedeenian.Release matches 1750.. run scoreboard players set @s Nosedeenian.Release 1750
advancement revoke @s only omni_extras:energy_on_entity_killed