execute if entity @s[palladium.power=alienevo:prototype_omnitrix] run superpower remove alienevo:prototype_omnitrix @s
execute if entity @s[palladium.power=evo_reds_alienpack_bug:prototype_omnitrix] run superpower remove evo_reds_alienpack_bug:prototype_omnitrix @s
execute if entity @s[palladium.power=alienevo:ult_omnitrix] run superpower remove alienevo:ult_omnitrix @s
execute if entity @s[palladium.power=alienevo:recal_omnitrix] run superpower remove alienevo:recal_omnitrix @s
execute if entity @s[palladium.power=alienevo:completed_omnitrix] run superpower remove alienevo:completed_omnitrix @s
execute if entity @s[palladium.power=aeo:omniverse_omnitrix] run superpower remove aeo:omniverse_omnitrix @s

execute if entity @s[palladium.power=alienevo:prototype_omnitrix] run tag @s add hasproto
execute if entity @s[palladium.power=evo_reds_alienpack_bug:prototype_omnitrix] run tag @s add hasbuggy
execute if entity @s[palladium.power=alienevo:ult_omnitrix] run tag @s add hasult
execute if entity @s[palladium.power=alienevo:recal_omnitrix] run tag @s add hasrecal
execute if entity @s[palladium.power=alienevo:completed_omnitrix] run tag @s add hasovtrix
execute if entity @s[palladium.power=aeo:omniverse_omnitrix] run tag @s add hasovtrixbeans

execute if entity @s[palladium.power=alienevo:prototype_omnitrix] run playsound alienevo:prototype_decouple master @s
execute if entity @s[palladium.power=evo_reds_alienpack_bug:prototype_omnitrix] run playsound alienevo:prototype_decouple master @s
execute if entity @s[palladium.power=alienevo:ult_omnitrix] run playsound alienevo:prototype_decouple master @s
execute if entity @s[palladium.power=alienevo:recal_omnitrix] run playsound alienevo:prototype_decouple master @s
execute if entity @s[palladium.power=alienevo:completed_omnitrix] run playsound alienevo:prototype_decouple master @s
execute if entity @s[palladium.power=aeo:omniverse_omnitrix] run playsound alienevo:prototype_decouple master @s

alienautoadd @s omni_extras:murkgourmand