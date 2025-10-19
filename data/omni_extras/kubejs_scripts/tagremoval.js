
ServerEvents.loaded(event => {
        event.server.runCommandSilent('tag @a remove Gourmand.Obtained');
        Utils.server.runCommandSilent('tag @a remove Gourmand.Obtained');
});

PlayerEvents.loggedIn(event => {
        event.player.runCommandSilent('tag @s remove Gourmand.Obtained');
});
