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
  for (var msg in message){
      var newDiv = $('<h4>'+ message[msg]+'</h4>');
      $('.message').append(newDiv);
  }
}
//Clears the message area
function clear(){
  $('.message').html(' ')
}

var message = $('.message');

function setHealth(char,id ){
  $(id).css('width', (char.getHealth));
  $(id).html((char.vit - char.damage) + '/' + char.vit)
}

function setFury(char,id ){
  $(id).css('width', (char.getFury));
  $(id).html(char.currentFury + '/' + char.fury);
}

// !!!!!!!Creates a character object, all the characters and NPC will use this as a basis of creation
function char(name, vit, str, dex, int, ac, fury){
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
    self.currentFury = self.currentFury + d(6);
    if(attackRoll < target.ac){ 
      msg.push(self.name + ' attacked ' + target.name);
      msg.push(self.name + ' rolled a ' + attackRoll);
      msg.push(self.name + ' missed ' + target.name)
      clear();
      print(msg);
    }
    if((self.str + roll) > target.ac){
      damage = ((self.str + roll) - target.ac);
      // creates the message
      msg.push(self.name + ' attacked ' + target.name);
      msg.push(self.name + ' rolled a ' + roll);
      msg.push(self.name + ' dealt ' + damage + ' damage to ' + target.name)
      // prints the message to the game board
      clear();
      print(msg);
      target.damage = target.damage + damage;
      setHealth(target,'#npcHealthBar');
      setFury(self, '#furyBar');
      target.isDead()
    }else if ((self.str + roll) < target.ac){
      msg.push(self.name + ' attacked ' + target.name + ' and it did no damage');
      clear();
      print(msg);
      console.log(self.name + ' attacked ' + target.name + ' and it did no damage')
    }
  },

  self.furiousStrike = function(target){
    var msg = [];
    var roll = advantage(20,2);
    var damage;
    if((self.str + roll) > target.ac){
      damage = ((self.str + roll) - target.ac);
      // creates the message
      msg.push(self.name + ' used Furious Strike!');
      msg.push(self.name + ' attacked ' + target.name);
      msg.push(self.name + ' rolled a ' + roll);
      msg.push(self.name + ' dealt ' + damage + ' to ' + target.name)
      // prints the message to the game board
      print(msg)
      target.damage = target.damage + damage;
    }else if ((self.str + roll) < target.ac){
      msg.push(target.name + '\'s armour is too high!');
      msg.push(self.name + ' attacked ' + target.name + ' and it did no damage');
      print(msg)
      console.log(self.name + ' attacked ' + target.name + ' and it did no damage')
    }
  }

  self.isDead = function(){
    if(self.damage >= self.vit){
      var msg = [self.name+' got rekt!'];
      print(msg);
      return true;
    }
  }
}

char.prototype = {
  test: function(){
    console.log(this.name);
  }
}



