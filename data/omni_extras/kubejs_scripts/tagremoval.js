
ServerEvents.loaded(event => {
        event.server.runCommandSilent('tag @a remove Gourmand.Obtained');
        Utils.server.runCommandSilent('tag @a remove Gourmand.Obtained');
        Utils.server.runCommandSilent('scoreboard objectives remove Gourmand.Level');
        Utils.server.runCommandSilent('scoreboard objectives remove Gourmand.XP');
        Utils.server.runCommandSilent('scoreboard objectives remove Gourmand.SkillPoint');
        Utils.server.runCommandSilent('scoreboard objectives remove GourmandMurk.Level');
        Utils.server.runCommandSilent('scoreboard objectives remove GourmandMurk.XP');
        Utils.server.runCommandSilent('scoreboard objectives remove GourmandMurk.SkillPoint');
        Utils.server.runCommandSilent('scoreboard objectives remove Murk_Gourmand.Level');
        Utils.server.runCommandSilent('scoreboard objectives remove Murk_Gourmand.XP');
        Utils.server.runCommandSilent('scoreboard objectives remove Murk_Gourmand.SkillPoint');
        Utils.server.runCommandSilent('scoreboard objectives remove Murk_gourmand.Level');
        Utils.server.runCommandSilent('scoreboard objectives remove Murk_gourmand.XP');
        Utils.server.runCommandSilent('scoreboard objectives remove Murk_gourmand.SkillPoint')
        Utils.server.runCommandSilent('scoreboard objectives remove Perk_gourmand.Level');
        Utils.server.runCommandSilent('scoreboard objectives remove Perk_gourmand.XP');
        Utils.server.runCommandSilent('scoreboard objectives remove Perk_gourmand.SkillPoint')
});

PlayerEvents.loggedIn(event => {
        event.server.runCommandSilent('tag @s remove Gourmand.Obtained');
        Utils.server.runCommandSilent('tag @a remove Gourmand.Obtained');
        Utils.server.runCommandSilent('scoreboard objectives remove Gourmand.Level');
        Utils.server.runCommandSilent('scoreboard objectives remove Gourmand.XP');
        Utils.server.runCommandSilent('scoreboard objectives remove Gourmand.SkillPoint');
        Utils.server.runCommandSilent('scoreboard objectives remove GourmandMurk.Level');
        Utils.server.runCommandSilent('scoreboard objectives remove GourmandMurk.XP');
        Utils.server.runCommandSilent('scoreboard objectives remove GourmandMurk.SkillPoint');
        Utils.server.runCommandSilent('scoreboard objectives remove Murk_Gourmand.Level');
        Utils.server.runCommandSilent('scoreboard objectives remove Murk_Gourmand.XP');
        Utils.server.runCommandSilent('scoreboard objectives remove Murk_Gourmand.SkillPoint');
        Utils.server.runCommandSilent('scoreboard objectives remove Murk_gourmand.Level');
        Utils.server.runCommandSilent('scoreboard objectives remove Murk_gourmand.XP');
        Utils.server.runCommandSilent('scoreboard objectives remove Murk_gourmand.SkillPoint')
        Utils.server.runCommandSilent('scoreboard objectives remove Perk_gourmand.Level');
        Utils.server.runCommandSilent('scoreboard objectives remove Perk_gourmand.XP');
        Utils.server.runCommandSilent('scoreboard objectives remove Perk_gourmand.SkillPoint')
});
