ItemEvents.foodEaten(e =>{
    if (e.item.hasTag('omni_extras:uneatable')) { 
        if (hasAnyGourmand(e.player)) {
            const roll = Math.floor(Math.random() * 5) + 1
           switch (roll) {
                case 1:
                    e.player.tell("§2That doesn't taste right...");
                    break;
                case 2:
                    e.player.tell("§2Ugh, I feel sick...");
                    break;
                case 3:
                    e.player.tell("§2I don't think I can eat that...");
                    break;
                case 4:
                    e.player.tell("§2*stomach rumbles*");
                    break;
                case 5:
                    e.player.tell("§2I feel nauseous...");
                    break;
            }
            palladium.superpowers.addSuperpower(e.player, 'omni_extras:not_aliens/foodpoisoned');
            e.cancel();
        }
    }
});
ItemEvents.foodEaten(e => {
    if (e.item.id !== 'omni_extras:mysterious_tablet') return

    const player = e.player

    if (hasAnyGourmand(e.player)) {
        player.tell(Text.yellow("Yummy!"));
        player.playSound('entity.player.burp');
    } else {
        player.runCommandSilent(`effect give ${player.name.string} minecraft:poison 5 1 true`);
        player.tell(Text.red("I shouldn't have eaten that.."));
    }
});

ItemEvents.foodEaten(e => {
    if (e.item.id !== 'omni_extras:granoall_bar') return

    const player = e.player

    if (hasAnyGourmand(e.player)) {
        player.tell(Text.yellow("Scrumptious!"));
        player.playSound('entity.player.burp');
        player.runCommandSilent(
            `energybar value add ${player.name.string} omni_extras:perkgourmand stomach 300`);
        player.runCommandSilent(
            `energybar value add ${player.name.string} omni_extras:murkgourmand stomach 300`);
    } else {
        player.runCommandSilent(`effect give ${player.name.string} minecraft:poison 5 1 true`);
        player.runCommandSilent(`effect give ${player.name.string} minecraft:hunger 9 150 true`);
        player.runCommandSilent(`effect give ${player.name.string} minecraft:nausea 8 15 true`);
        player.tell(Text.red("Oh.. God.. I'm gonna.."));
    }
    player.give('omni_extras:wrapper');
});

ItemEvents.rightClicked(e =>{
    if (e.item.hasTag('omni_extras:bigboost')) {
        const player = e.player
        let maxScore = palladium.scoreboard.getScore(player, 'Gourmand.ObliterationPoint');
        if (maxScore === 6) {
            player.tell(Text.yellow("I don't think I can eat any more.."));
            player.runCommandSilent(
                `playsound minecraft:entity.villager.no player ${player.name.string} ~ ~ ~ 1000`);
            return;
        }
        if (hasAnyGourmand(e.player)) {
            e.item.count--
            player.tell(Text.of("§l§eThat filled me up!"))
            player.runCommandSilent(
                `playsound minecraft:entity.player.burp player ${player.name.string} ~ ~ ~ 1000`);
            player.runCommandSilent(
                `effect give ${player.name.string} minecraft:saturation 10 5 true`);
            player.runCommandSilent(
                `energybar value add ${player.name.string} omni_extras:perkgourmand stomach 1500`);
            player.runCommandSilent(
                `energybar value add ${player.name.string} omni_extras:murkgourmand stomach 1500`);
            palladium.scoreboard.setScore(player, 'Gourmand.ObliterationPoint', 6);
        } else
            
            {
        };
    }
});

ItemEvents.rightClicked(e =>{
    if (e.item.hasTag('omni_extras:smallboost')) {
        const player = e.player
        let maxScore = palladium.scoreboard.getScore(player, 'Gourmand.ObliterationPoint');
        if (maxScore === 6) {
            player.tell(Text.yellow("I don't think I can eat any more.."));
            player.runCommandSilent(
                `playsound minecraft:entity.villager.no player ${player.name.string} ~ ~ ~ 1000`);
            return;
        }
        if (hasAnyGourmand(e.player)) {
            e.item.count--
            player.tell(Text.yellow("That hits the spot.. Maybe just a bit more.."))
            player.runCommandSilent(
                `playsound minecraft:entity.player.burp player ${player.name.string} ~ ~ ~ 1000`);
            player.runCommandSilent(
                `effect give ${player.name.string} minecraft:saturation 10 1 true`);
            player.runCommandSilent(
                `energybar value add ${player.name.string} omni_extras:perkgourmand stomach 250`);
            player.runCommandSilent(
                `energybar value add ${player.name.string} omni_extras:murkgourmand stomach 300`);
            palladium.scoreboard.addScore(player, 'Gourmand.ObliterationPoint', 1);
            }   
        {   
        };
    }
});

function hasAnyGourmand(player) {
    const gourmandPowers = [
        'omni_extras:perkgourmand',
        'omni_extras:murkgourmand'
    ];
    return gourmandPowers.some(power => palladium.superpowers.hasSuperpower(player, power));
}

PlayerEvents.tick(e => {
    const player = e.player;
    const heldItem = player.getMainHandItem();
    const data = player.persistentData;

    const isHoldingEdible = heldItem.hasTag('omni_extras:smallboost') || heldItem.hasTag('omni_extras:bigboost') ;
    const wasHoldingEdible = data.getBoolean("gourmand_was_holding") || false;

    if (hasAnyGourmand(player)) {
        if (isHoldingEdible && !wasHoldingEdible) {
            player.runCommandSilent(
                `playsound minecraft:entity.experience_orb.pickup player ${player.name.string} ~ ~ ~ 1000`
            );
            player.server.runCommandSilent(
                `title ${player.name.string} actionbar {"text":"This looks edible","color":"green","bold":true,"italic":true}`
            );
        }
    }
    data.putBoolean("gourmand_was_holding", isHoldingEdible);
});

