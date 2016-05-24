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

// function printStats(obj, selector){
//   for (var prop in obj) {
//     var newLi = $('<li>'+ prop + ' = ' + obj[prop]  + '</li>');
//     $(selector).append(newLi);
//   } 
// }

function printPlayerStats(obj){
  $('.playerName').html('<h3>' + obj.name + '</h3>');
  $('.playerLvl').html('lvl: '+ obj.lvl);
}

function printNpcStats(obj){
  $('.npcName').html('<h3>' + obj.name + '</h3>');
  $('.npcLvl').html('lvl: '+ obj.lvl);
}

function print(message){
  for (var msg in message){
    var newDiv = $('<h4>'+ message[msg]+'</h4>');
    $('.message').append(newDiv);
  }
}

var message = $('.message');

function setHealth(char,id ){
  $(id).css('width', (char.getHealth));
  $(id).html((char.vit - char.damage) + '/' + char.vit)
}

// Creates a character object, all the characters and NPC will use this as a basis of creation
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
    return ((self.currentFury/self.fury) * 100);
  },

  self.attack = function(target){
    var msg = [];
    var roll = d(20);
    var damage;
    if((self.str + roll) > target.ac){
      damage = ((self.str + roll) - target.ac);
      // creates the message
      msg.push(self.name + ' attacked ' + target.name);
      msg.push(self.name + ' rolled a ' + roll);
      msg.push(self.name + ' dealt ' + damage + ' to ' + target.name)
      // prints the message to the game board
      print(msg)
      target.damage = target.damage + damage;
    }else if ((self.str + roll) < target.ac){
      msg.push(self.name + ' attacked ' + target.name + ' and it did no damage');
      print(msg)
      console.log(self.name + ' attacked ' + target.name + ' and it did no damage')
    }
  },

  self.furiousStrike = function(target){
      var roll = advantage(20,2);
      console.log(self.name + ' attacked ' + target.name);
      console.log('You rolled a ' + roll);
      var damage = (self.str + roll - target.ac);
      console.log(damage);
  }
}

char.prototype = {
  test: function(){
    console.log(this.name);
  }
}




