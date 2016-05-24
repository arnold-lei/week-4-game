  // name, vit, str, dex, int, ac, fury
  var a = new char('Arnold', (d(6) + 100), (d(6)+ 15), (d(6) + 15), (d(6) + 15), (d(6) + 13), (d(6) + 10)) ;
  var b = new char('Wild Troll', (d(6) + 100), (d(6)+ 15), (d(6) + 15), (d(6) + 15), (d(6) + 20), (d(6) + 10));
  printPlayerStats(a);
  printNpcStats(b);
  // a.attack(b);



  console.log(a.getHealth())

  console.log(a.vit)
  setHealth(a,'#healthBar');
  setHealth(b,'#npcHealthBar');




