// This is a RNG to mimic the number game mechanics of DnD
function d(num){
  return Math.floor(Math.random()*num);
}

// Advantage is a game mechanic where a player can get more than one dice to modify their rolls and they choose the highest dice.
// The num is for # of dice sides, and multi is how many dice
function advantage(num, multi){
  var a = [];
  for(var i = 0; i < multi; ++i){
    a.push(d(num));
  }
  console.log(a);
  return Math.max(...a)
}

// disadvantage is a game mechanic where a player can get more than one dice to modify their rolls and they choose the lowest dice. 
// The num is for # of dice sides, and multi is how many dice
function disadvantage(num, multi){
  var a = [];
  for(var i = 0; i < multi; ++i){
    a.push(d(num));
  }
  console.log(a);
  return Math.min(...a);
}

function initiative(player, npc){
  var playerRoll = d(6) + player.dex;
  var npcRoll  = d(6) + npc.dex;
  console.log(playerRoll, npcRoll);
  var highRoll;
  print(player.name + ' rolled a ' + playerRoll + ' for initiative');
  print(npc.name + ' rolled a ' + npcRoll + ' for initiative');

  if(playerRoll >= npcRoll){
    highRoll = playerRoll;
    print(player.name + ' goes first');
    player.turn = 1;
  }else{
    highRoll = npcRoll;
    print(npc.name + ' goes first');
    npc.turn = 1;
  }
}



var inventory = [];

function printPlayerStats(obj){
  $('.playerName').html('<h3>' + obj.name + '</h3>');
  $('.playerLvl').html('lvl: '+ obj.lvl);
}

function printNpcStats(obj){
  $('.npcName').html('<h3>' + obj.name + '</h3>');
  $('.npcLvl').html('lvl: '+ obj.lvl);
}
// Prints to message area
function print(message){
  if (typeof message === 'object'){
    for (var msg in message){
        var newDiv = $('<h4>'+ message[msg]+'</h4>');
        $('.message').append(newDiv);
    }
  }else if (typeof message === 'string'){
    var newDiv = $('<h4>'+ message+'</h4>');
    $('.message').append(newDiv); 
  }
}
//Clears the message area
function clear(){
  $('.message').html(' ')
}

var message = $('.message');

function setHealth(char){
  if(char.type === 'player'){
    $('#healthBar').css('width', (char.getHealth));
    $('#healthBar').html((char.vit - char.damage) + '/' + char.vit);
  }else if (char.type === 'npc'){
    $('#npcHealthBar').css('width', (char.getHealth));
    $('#npcHealthBar').html((char.vit - char.damage) + '/' + char.vit);    
  }
}

function setFury(char){
  // $(id).css('width', (char.getFury));
  // $(id).html(char.currentFury + '/' + char.fury);
    if(char.type === 'player'){
    $('#furyBar').css('width', (char.getFury));
    $('#furyBar').html(char.currentFury + '/' + char.fury);
    if(char.currentFury < 5){
      hideButtons('#furiousStrike')
    } else {
      showButtons('#furiousStrike');
    }
    if(char.currentFury < 10 ){
      hideButtons('#breserk')
    } else {
      showButtons('#breserk');
    }

  }else if (char.type === 'npc'){

  }

}

function setPlayerHealth(player){
  $('#healthBar').css('width', (player.getHealth));
  $('#healthBar').html((player.vit - player.damage) + '/' + player.vit);
}

function setNpcHealth(npc){
  $('#npcHealthBar').css('width', (npc.getHealth));
  $('#npcHealthBar').html((npc.vit - npc.damage) + '/' + npc.vit);
}



// !!!!!!!Creates a character object, all the characters and NPC will use this as a basis of creation
function char(name, vit, str, dex, int, ac, fury, type){
  var self = this; 
  self.name = name || 'npc';
  self.vit = vit || 20;
  self.str = str || 5;
  self.dex = dex || 3;
  self.int = int || 3;
  self.ac = ac || 17;
  self.fury = fury || 30;
  self.lvl = 1;
  self.damage = 0;
  self.currentFury = 0;
  self.type = type || 'npc'
  console.log(char.arguments);

  self.getHealth = function(){
    var health = (((self.vit - self.damage)/self.vit) * 100);
    return health+'%'
  },

  self.getFury = function(){
    var fury = ((self.currentFury/self.fury) * 100);
    return fury + '%'
  },

  self.attack = function(target){
    var msg = [];
    var attackRoll = d(20) + self.str;
    var roll = d(20);
    var damage;
    self.currentFury = self.currentFury + d(4) + 3;

    // Attacker misses the target
    if(attackRoll < target.ac){ 
      msg.push(self.name + ' attacked ' + target.name);
      msg.push(self.name + ' rolled a ' + attackRoll);
      msg.push(self.name + ' missed ' + target.name)
      clear();
      print(msg); 
    }
    //Target is able to hit and do damage
    if((self.str + roll) > target.ac){
      damage = ((self.str + roll) - target.ac);
      // creates the message
      msg.push(self.name + ' attacked ' + target.name);
      msg.push(self.name + ' rolled a ' + roll);
      msg.push(self.name + ' dealt ' + damage + ' damage to ' + target.name)
      // prints the message to the game board
      target.damage = target.damage + damage;

      //Attacker is able to hit but unable to do damage
    }else if ((self.str + roll) < target.ac){
      msg.push(self.name + ' attacked and hit ' + target.name);
      msg.push(self.name + ' attacked ' + target.name + ' and it did no damage');
      console.log(self.name + ' attacked ' + target.name + ' and it did no damage')
    }
    clear();
    print(msg);
    setHealth(target);
    setFury(self);
    target.isDead() 
  },

  self.furiousStrike = function(target){
    var msg = [];
    if(self.currentFury < 5){
      msg.push(self.name + ' does not have enough fury for this attack ');
      clear();
      print(msg);

    } else {

      //Roll to hit
      var attackRoll = d(20) + self.str;
      //Roll for damage
      var roll = advantage(20,2);
      var damage;


      if(attackRoll < target.ac){ 
        msg.push(self.name + ' attacked ' + target.name);
        msg.push(self.name + ' rolled a ' + attackRoll);
        msg.push(self.name + ' missed ' + target.name)
      }

      if((self.str + roll) > target.ac){
        damage = ((self.str + roll) - target.ac);
        // creates the message
        msg.push(self.name + ' used Furious Strike!');
        msg.push(self.name + ' attacked ' + target.name);
        msg.push(self.name + ' rolled a ' + roll);
        msg.push(self.name + ' dealt ' + damage + ' to ' + target.name)
        target.damage = target.damage + damage;
      }else if ((self.str + roll) < target.ac){
        msg.push(target.name + '\'s armour is too high!');
        msg.push(self.name + ' attacked ' + target.name + ' and it did no damage')
      }
      self.currentFury = self.currentFury - 5;
      clear();
      print(msg);
      setHealth(target);
      setFury(self);
      target.isDead()
    }
  }
  self.berserk = function(){
    var msg = [];
    var roll = d(6)
    self.damage = self.damage - (roll + self.str);
    msg.push(self.name + ' used Breserk!');
    msg.push(self.name + ' rolled a ' + roll); 
    msg.push(self.name + ' healed ' + (roll + self.str) + ' life'); 
    self.currentFury = self.currentFury - 10;
    clear();
    print(msg);
    setHealth(self);
    setFury(self);
    target.isDead()
  }
  self.isDead = function(){
    if(self.damage >= self.vit){
      var msg = [self.name+' got rekt!'];
      print(msg);
      return true;
    }
  }
  self.notDead = function(){
    if(self.damage < self.vit){
      return true;
    }
  }

  self.useItem = function(itemName){
    return itemName(self);
    setHealth(self, target, '#healthBar' ,'#npcHealthBar');
  }
}

char.prototype = {
  test: function(){
    console.log(this.name);
  }
}



