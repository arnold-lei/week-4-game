
  // name, vit, str, dex, int, ac, fury, type 
  var a = new char('Arnold', (d(6) + 30), (d(6)+ 15), (d(6) + 15), (d(6) + 15), (d(6) + 13), (d(6) + 10), 'player') ;
  var b = new char('Wild Troll', (d(6) + 25), (d(6)+ 15), (d(6) + 15), (d(6) + 15), (d(6) + 20), (d(6) + 10));
  printPlayerStats(a);
  printNpcStats(b);
  // a.attack(b);

  setPlayerHealth(a)
  setNpcHealth(b);
  setFury(a, '#furyBar');

function Game(){

}


function monsterBehavior(target){
  var roll = d(6);
  if (roll = 1){

  }
}

