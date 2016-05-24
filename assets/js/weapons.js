var weapons = {
  sword: 6,
  mace: 6,
}

function PoH(self){
  console.log(self.damage)
  self.damage = self.damage - (2*d(4) + 2);
   printPlayerStats(self);
}