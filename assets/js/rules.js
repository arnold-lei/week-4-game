// This is a RNG to mimic the number game mechanics of DnD
function d(num) {
    'use strict'
    return Math.floor(Math.random() * num);
}

// Advantage is a game mechanic where a player can get more than one dice to modify their rolls and they choose the highest dice.
// The num is for # of dice sides, and multi is how many dice
function advantage(num, multi) {
    var a = [];
    for (var i = 0; i < multi; ++i) {
        a.push(d(num));
    }
    return Math.max(...a)
}

// disadvantage is a game mechanic where a player can get more than one dice to modify their rolls and they choose the lowest dice. 
// The num is for # of dice sides, and multi is how many dice
function disadvantage(num, multi) {
    var a = [];
    for (var i = 0; i < multi; ++i) {
        a.push(d(num));
    }
    return Math.min(...a);
}

function initiative(player, npc) {
    var playerRoll = d(6) + player.dex;
    var npcRoll = d(6) + npc.dex;
    var highRoll;
    print(player.name + ' rolled a ' + playerRoll + ' for initiative');
    print(npc.name + ' rolled a ' + npcRoll + ' for initiative');

    if (playerRoll >= npcRoll) {
        highRoll = playerRoll;
        print(player.name + ' goes first');
        player.turn = 1;
    } else {
        highRoll = npcRoll;
        print(npc.name + ' goes first');
        npc.turn = 1;
    }
}



var inventory = [];

function printPlayerStats(obj) {
    $('.playerName').html('<h3>' + obj.name + '</h3>');
    $('.playerLvl').html('lvl: ' + obj.lvl);
}

function printNpcStats(obj) {
    $('.npcName').html('<h3>' + obj.name + '</h3>');
    $('.npcLvl').html('lvl: ' + obj.lvl);
}
// Prints to message area
function print(message) {
    if (typeof message === 'object') {
        for (var msg in message) {
            var newDiv = $('<h4>' + message[msg] + '</h4>');
            setTimeout($('.message').append(newDiv),3000);
        }
    } else if (typeof message === 'string') {
        var newDiv = $('<h4>' + message + '</h4>');
        $('.message').append(newDiv);
    }
}
//Clears the message area
function clear() {
    $('.message').html(' ')
}

var message = $('.message');

function setHealth(char) {
    if (char.type === 'player') {
        $('#healthBar').css('width', (char.getHealth));
        $('#healthBar').html((char.vit - char.damage) + '/' + char.vit);
    } else if (char.type === 'npc') {
        $('#npcHealthBar').css('width', (char.getHealth));
        $('#npcHealthBar').html((char.vit - char.damage) + '/' + char.vit);
    }
}

function setFury(char) {
    // $(id).css('width', (char.getFury));
    // $(id).html(char.currentFury + '/' + char.fury);
    if (char.type === 'player') {
        $('#furyBar').css('width', (char.getFury));
        $('#furyBar').html(char.currentFury + '/' + char.fury);
        if (char.currentFury < 5) {
            hideButtons('#furiousStrike')
        } else {
            showButtons('#furiousStrike');
        }
        if (char.currentFury < 5) {
            hideButtons('#defend')
        } else {
            showButtons('#defend');
        }

    } else if (char.type === 'npc') {

    }

}

function setPlayerHealth(player) {
    $('#healthBar').css('width', (player.getHealth));
    $('#healthBar').html((player.vit - player.damage) + '/' + player.vit);
}

function setNpcHealth(npc) {
    $('#npcHealthBar').css('width', (npc.getHealth));
    $('#npcHealthBar').html((npc.vit - npc.damage) + '/' + npc.vit);
}





char.prototype = {
    test: function() {
        console.log(this.name);
    }
}
