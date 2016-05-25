function behavior(npc, target){
  var roll = d(10);
    if (roll >= 9){
      npc.currentFury = 10;
      npc.furiousStrike(target);
    }else if ( roll >= 3){
      npc.attack(target)
    }else{
      var msg = npc.name + ' is confused!';
      print(msg);
      npc.attack(npc);
    }
  npc.turn = false;
  target.turn = true
}