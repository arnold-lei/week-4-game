function behavior(npc, target) {
    showButtons('.btn');
    var roll = d(10);
    if (roll >= 9) {
        npc.currentFury = 10;
        npc.furiousStrike(target);
    } else if (roll >= 3) {
        npc.attack(target)
    } else {
        var msg = npc.name + ' is confused!';
        print(msg);
        npc.attack(npc);
    }
    setHealth(target);
    setFury(target);
    target.isDead();
      
}

function npcTurn(b, a) {
    $('.attackButtons').click(function() {
        hideButtons('.btn');
        var btn = $(this);
        // btn.prop('disabled', true);
        if (b.isDead()) {
          print(b.name + ' is dead')
        } else {
            setTimeout(behavior(b, a), 3000);
        }
    });
}
