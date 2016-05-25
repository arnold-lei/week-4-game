function hideButtons(){
  $('button').addClass('btn-disabled');
  $('button').attr('disabled', 'disabled');
  $('button').prop('disabled', true);
}

function showButtons(){
  $('button').addClass('btn-default');
  $('button').attr('disabled', '');
  $('button').prop('disabled', false);
}

function npcTurn(b,a){
  hideButtons()
  $('.btn').click(function() {
      var btn =  $(this);
      // btn.prop('disabled', true);
      setTimeout(function() {
          behavior(b,a)
      }, 3000);
  });
  showButtons();
}