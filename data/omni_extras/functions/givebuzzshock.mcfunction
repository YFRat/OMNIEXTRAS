execute if entity @s[tag=Nosedeenian.Capable] run playsound alienevo:prototype_core_place ambient @s ~ ~ ~
execute if entity @s[tag=Nosedeenian.Capable] run alienautoadd @s omni_extras:nosedeenian
execute if entity @s[tag=Nosedeenian.Capable] run tellraw @a {"text":"Omnitrix feels weird.","color":"green"}
advancement revoke @s only omni_extras:lightning_strike