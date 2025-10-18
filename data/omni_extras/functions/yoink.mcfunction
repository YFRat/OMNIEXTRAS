execute if entity @s[palladium.power=alienevo:prototype_omnitrix] run superpower remove alienevo:prototype_omnitrix @s
execute if entity @s[palladium.power=evo_reds_alienpack_noncustom:recal_omnitrix] run superpower remove evo_reds_alienpack_noncustom:recal_omnitrix @s
execute if entity @s[palladium.power=evo_reds_alienpack_bug:prototype_omnitrix] run superpower remove evo_reds_alienpack_bug:prototype_omnitrix @s
execute if entity @s[palladium.power=evo_reds_alienpack_ult:ult_omnitrix] run superpower remove evo_reds_alienpack_ult:ult_omnitrix @s
execute if entity @s[palladium.power=evo_reds_alienpack_ult_noncustom:ult_omnitrix] run superpower remove evo_reds_alienpack_ult_noncustom:ult_omnitrix @s
execute if entity @s[palladium.power=evo_reds_alienpack:recal_omnitrix] run superpower remove evo_reds_alienpack:recal_omnitrix @s
execute if entity @s[palladium.power=evo_reds_alienpack_completed:completed_omnitrix] run superpower remove evo_reds_alienpack_completed:completed_omnitrix @s

execute if entity @s[palladium.power=alienevo:prototype_omnitrix] run tag @s add hasproto
execute if entity @s[palladium.power=evo_reds_alienpack_noncustom:recal_omnitrix] run tag @s add hasNCrecal
execute if entity @s[palladium.power=evo_reds_alienpack_bug:prototype_omnitrix] run tag @s add hasbuggy
execute if entity @s[palladium.power=evo_reds_alienpack_ult:ult_omnitrix] run tag @s add hasult
execute if entity @s[palladium.power=evo_reds_alienpack_ult_noncustom:ult_omnitrix] run tag @s add hasNCult
execute if entity @s[palladium.power=evo_reds_alienpack:recal_omnitrix] run tag @s add hasrecal
execute if entity @s[palladium.power=evo_reds_alienpack_completed:completed_omnitrix] run tag @s add hasovtrix

execute if entity @s[palladium.power=alienevo:prototype_omnitrix] run playsound alienevo:prototype_decouple master @s
execute if entity @s[palladium.power=evo_reds_alienpack_noncustom:recal_omnitrix] run playsound evo_reds_alienpack:recal_decouple master @s
execute if entity @s[palladium.power=evo_reds_alienpack_bug:prototype_omnitrix] run playsound evo_reds_alienpack:recal_decouple master @s
execute if entity @s[palladium.power=evo_reds_alienpack_ult:ult_omnitrix] run playsound evo_reds_alienpack:recal_decouple master @s
execute if entity @s[palladium.power=evo_reds_alienpack_ult_noncustom:ult_omnitrix] run playsound evo_reds_alienpack:recal_decouple master @s
execute if entity @s[palladium.power=evo_reds_alienpack:recal_omnitrix] run playsound evo_reds_alienpack:recal_decouple master @s
execute if entity @s[palladium.power=evo_reds_alienpack_completed:completed_omnitrix] run playsound evo_reds_alienpack:recal_decouple master @s

alienautoadd @s omni_extras:gourmand