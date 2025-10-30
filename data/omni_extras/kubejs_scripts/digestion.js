const FoodEffects = {
    'omni_extras:mysterious_tablet': {
        gourmand: p => {
            p.tell(Text.yellow("Yummy!"));
            p.playSound('entity.player.burp');
        },
        normal: p => {
            p.potionEffects.add('minecraft:poison', 100, 1, true, true);
            p.tell(Text.red("I shouldn't have eaten that.."));
        }
    },
    'omni_extras:granoall_bar': {
        gourmand: p => {
            p.tell(Text.yellow("Scrumptious!"));
            p.playSound('entity.player.burp');
            ['omni_extras:perkgourmand', 'omni_extras:murkgourmand'].forEach(power =>
                p.runCommandSilent(`energybar value add ${p.name.string} ${power} stomach 300`)
            );
            p.give('omni_extras:wrapper');
        },
        normal: p => {
            p.potionEffects.add('minecraft:poison', 100, 1, true, true);
            p.potionEffects.add('minecraft:hunger', 180, 150, true, true);
            p.potionEffects.add('minecraft:nausea', 160, 15, true, true);
            p.tell(Text.red("Oh.. God.. I'm gonna.."));
            p.give('omni_extras:wrapper');
        }
    }
};

ItemEvents.foodEaten(e => {
    const { player, item } = e;
    const id = item.id;
    if (item.hasTag('omni_extras:uneatable') && hasAnyGourmand(player)) {
        const msg = [
            "§2That doesn't taste right...",
            "§2Ugh, I feel sick...",
            "§2I don't think I can eat that...",
            "§2*stomach rumbles*",
            "§2I feel nauseous..."
        ][Math.floor(Math.random() * 5)];

        player.tell(msg);
        palladium.superpowers.addSuperpower(player, 'omni_extras:not_aliens/foodpoisoned');
        e.cancel();
        return;
    }

    const food = FoodEffects[id];
    if (!food) return;

    if (hasAnyGourmand(player))
        food.gourmand(player);
    else
        food.normal(player);
});

const BoostItems = {
    big: [
        'omni_extras:bigboostvan',
        'omni_extras:bigboostalex'
    ],
    small: [
        'omni_extras:smallboostvan',
        'omni_extras:smallboostalex'
    ]
};
ItemEvents.rightClicked(e => {
    const player = e.player;
    const item = e.item;
    if (!hasAnyGourmand(player)) return;

    const isBig = BoostItems.big.some(tag => item.hasTag(tag));
    const isSmall = BoostItems.small.some(tag => item.hasTag(tag));
    if (!isBig && !isSmall) return;

    let maxScore = palladium.scoreboard.getScore(player, 'Gourmand.ObliterationPoint');
    if (maxScore === 6) {
        player.tell(Text.yellow("I don't think I can eat any more.."));
        player.runCommandSilent(
        `playsound minecraft:entity.villager.no player ${player.name.string} ~ ~ ~ 1000`
    );
        return;
    }

    item.count--;
    player.tell(isBig ? "§l§eThat filled me up!" : "§eThat hits the spot.. Maybe just a bit more..");
    player.runCommandSilent(
        `playsound minecraft:entity.player.burp player ${player.name.string} ~ ~ ~ 1000`
    );
    player.potionEffects.add('minecraft:saturation', 200, 1, false, false);

    const stomachGain = isBig ? 1500 : 300;
    const obliterationGain = isBig ? 6 : 1;

    ['omni_extras:perkgourmand', 'omni_extras:murkgourmand'].forEach(power =>
        player.runCommandSilent(`energybar value add ${player.name.string} ${power} stomach ${stomachGain}`)
    );

    if (isBig)
        palladium.scoreboard.setScore(player, 'Gourmand.ObliterationPoint', obliterationGain);
    else
        palladium.scoreboard.addScore(player, 'Gourmand.ObliterationPoint', obliterationGain);
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

    const isBig = BoostItems.big.some(tag => heldItem.hasTag(tag));
    const isSmall = BoostItems.small.some(tag => heldItem.hasTag(tag));

    const isHoldingEdible = isBig || isSmall
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

