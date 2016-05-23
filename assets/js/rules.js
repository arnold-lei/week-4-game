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

function printStats(obj, selector){
  for (var prop in obj) {
    var newLi = $('<li>'+ prop + ' = ' + obj[prop] + '</li>');
    $(selector).append(newLi);
  } 
}

// function generateWeapon(){

// }

// Player class, all the characters and NPC will use this as a basis of creation
function char(name, vit, str, dex, int, ac, fury){
  var self = this; 
  self.name = name || 'npc';
  self.vit = vit || 20;
  self.str = str || 5;
  self.dex = dex || 3;
  self.int = int || 3;
  self.ac = ac || 17;
  self.fury = fury || 30;
  console.log(name, vit, str, dex, int, ac);

    self.attack = function(target){
      var roll = d(20);
      console.log(self.name + ' attacked ' + target.name);
      console.log('You rolled a ' + roll);
      var damage = (self.str + roll - target.ac);
      return damage;
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




var a = new char('Arnold', d(6), d(6), d(6), d(6), d(6), d(20));



var b = new char('Jenny', d(6), d(6), d(6), d(6), d(6), d(20));


