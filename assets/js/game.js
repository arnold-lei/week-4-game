// This is a RNG to mimic the number game mechanics of DnD
function d(num){
  return Math.floor(Math.random()*num);
}
// Advantage is a game mechanic where a player can get more than one dice to modify their rolls. The num is for # of dice sides, and multi is how many dice
function advantage(num, multi){
  var a = [];
  for(var i = 0; i < multi; ++i){
    a.push(d(num));
  }
  console.log(a);
  return Math.max(...a)
}

// Player class, all the characters and NPC will use this as a basis of creation
function Player() {
  var self = this; 
  self.init = function(name, vit, str, dex, int, ac, fury){
    self.name = name || 'npc';
    self.vit = vit || 20;
    self.str = str || 5;
    self.dex = dex || 3;
    self.int = int || 3;
    self.ac = ac || 17;
    self.fury = fury || 30;
    console.log(name, vit, str, dex, int, ac);
  }

  self.attack = function(target){
      var roll = d(20);
      console.log(self.name + ' attacked ' + target.name);
      console.log('You rolled a ' + roll);
      var damage = (self.str + roll - target.ac);
      return damage;
  }

  self.furiousStrike = function(target){
      var roll = advantage(20,2);
      console.log(self.name + ' attacked ' + target.name);
      console.log('You rolled a ' + roll);
      var damage = (self.str + roll - target.ac);
      console.log(damage);
  }

}


var a = new Player();
a.init('Arnold');

var b = new Player();
b.init('Jenny');


// var Sephiroth = new Player;
// Sephiroth.init(100, 1000, 'villan');

// Arnold.attack(Sephiroth.health);

