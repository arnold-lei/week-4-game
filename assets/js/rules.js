(function(global, $) {
  var char = function(name){
    return
  }
  char.prototype ={
    attack: function(){
      console.log('damage');
    }    
  }
  char.init = function(name){
    var self = this;
    self.name = this;
  }
  
  char.init.prototype = char.prototype;
  global.char = global.c$ = char;

}(window, jQuery));

