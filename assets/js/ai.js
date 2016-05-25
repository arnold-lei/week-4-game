function behavior(npc, target){
  showButtons();
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
}

function npcTurn(b,a){
  $('.btn').click(function() {
    hideButtons();
      var btn =  $(this);
      // btn.prop('disabled', true);
      setTimeout(function() {
          behavior(b,a)
      }, 3000);
  });
}