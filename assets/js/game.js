  // name, vit, str, dex, int, ac, fury, type 
  var a = new char('Arnold', (d(6) + 30), (d(6)+ 15), (d(6) + 15), (d(6) + 15), (d(6) + 13), (d(6) + 10), 'player') ;
  var b = new char('Wild Troll', (d(6) + 25), (d(6)+ 10), (d(6) + 10), (d(6) + 15), (d(6) + 8), (d(6) + 10));
  printPlayerStats(a);
  printNpcStats(b);
  // a.attack(b);

function Game(player, npc){
  var currentTurn = 0;
  setHealth(player);
  setHealth(npc);
  setFury(player);
  initiative(player, npc);
  if(npc.turn === 1){
    hideButtons('button');
    setTimeout(function() {
          behavior(npc,player)
      }, 3000);
  }else{

  }
  npcTurn(npc, player);
  if(player.isDead()){
    print(player.name + ' has defeated ' + npc.name);
  } else if (npc.isDead()){
   print(player.name + ' has been slain by ' + npc.name); 
  }
}


Game(a,b);


