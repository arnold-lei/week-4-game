// !!!!!!!Creates a character object, all the characters and NPC will use this as a basis of creation
function char(name, vit, str, dex, int, ac, fury, type) {
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
    self.type = type || 'npc'

    self.getHealth = function() {
            var health = (((self.vit - self.damage) / self.vit) * 100);
            return health + '%'
        },

        self.getFury = function() {
            var fury = ((self.currentFury / self.fury) * 100);
            if (self.currentFury >= self.fury) {
                return '100%'
            } else {
                return fury + '%'
            }
        },

        self.attack = function(target) {
            var msg = [];
            var attackRoll = d(6) + self.str;
            var roll = d(20);
            var damage;
            var miss = false
            self.currentFury = self.currentFury + d(4) + 2;

            // Attacker misses the target
            if (attackRoll < target.ac) {
                msg.push(self.name + ' attacked ' + target.name);
                msg.push(self.name + ' rolled a ' + attackRoll);
                msg.push(self.name + ' missed ' + target.name)
                clear();
                print(msg);
                miss = true;
            }

            //Target is able to hit and do damage
            if (((self.str + roll) > target.ac) && miss == false) {
                damage = ((self.str + roll) - target.ac);
                // creates the message
                msg.push(self.name + ' attacked ' + target.name);
                msg.push(self.name + ' rolled a ' + roll);
                msg.push(self.name + ' dealt ' + damage + ' damage to ' + target.name)
                    // prints the message to the game board
                target.damage = target.damage + damage;

                //Attacker is able to hit but unable to do damage
            } else if ((self.str + roll) < target.ac) {
                msg.push(self.name + ' attacked and hit ' + target.name);
                msg.push(self.name + ' attacked ' + target.name + ' and it did no damage');
                
            }
            clear();
            print(msg);
            setHealth(target);
            setFury(self);
            target.isDead()
        },

        self.furiousStrike = function(target) {
            var msg = [];
            if (self.currentFury < 5) {
                msg.push(self.name + ' does not have enough fury for this attack ');
                clear();
                print(msg);

            } else {

                //Roll to hit
                var attackRoll = d(20) + self.str;
                //Roll for damage
                var roll = advantage(20, 2);
                var damage;
                var miss = false;

                if (attackRoll < target.ac) {
                    msg.push(self.name + ' attacked ' + target.name);
                    msg.push(self.name + ' rolled a ' + attackRoll);
                    msg.push(self.name + ' missed ' + target.name)
                    miss = true
                }

                if ((self.str + roll) > target.ac && miss == false) {
                    damage = ((self.str + roll) - target.ac);
                    // creates the message
                    msg.push(self.name + ' used Furious Strike!');
                    msg.push(self.name + ' attacked ' + target.name);
                    msg.push(self.name + ' rolled a ' + roll);
                    msg.push(self.name + ' dealt ' + damage + ' to ' + target.name)
                    target.damage = target.damage + damage;
                } else if ((self.str + roll) < target.ac) {
                    msg.push(target.name + '\'s armour is too high!');
                    msg.push(self.name + ' attacked ' + target.name + ' and it did no damage')
                }
                self.currentFury = self.currentFury - 5;
                clear();
                print(msg);
                setHealth(target);
                setFury(self);
                target.isDead()
            }
        }
    self.defend = function(target){
        var msg = [];
        var roll = d(6);
        var def = roll + self.str;
        self.ac = self.ac + def;
        msg.push(self.name + ' used Defend!');
        msg.push(self.name + ' rolled a ' + roll);
        msg.push(self.name + ' has increased his armour by ' + def);
        self.currentFury = self.currentFury - 5;
        clear();
        print(msg);
        setHealth(target);
        setHealth(self);
        setFury(self);
        target.isDead()
    }
    self.berserk = function() {
        var msg = [];
        var roll = d(6)
        self.damage = self.damage - (roll + self.str);
        msg.push(self.name + ' used Breserk!');
        msg.push(self.name + ' rolled a ' + roll);
        msg.push(self.name + ' healed ' + (roll + self.str) + ' life');
        self.currentFury = self.currentFury - 10;
        clear();
        print(msg);
        setHealth(self);
        setFury(self);
        target.isDead()
    }
    self.isDead = function() {
        var msg = self.name + 'is dead!'
        if (self.damage >= self.vit) {
            print(msg);
            return true;
        }
    }
    self.notDead = function() {
        if (self.damage < self.vit) {
            return true;
        }
    }

    self.useItem = function(itemName) {
        return itemName(self);
        setHealth(self, target, '#healthBar', '#npcHealthBar');
    }
}