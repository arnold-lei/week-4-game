function hideButtons(id){
  $(id).attr('class', 'btn btn-default btn-disabled');
  $(id).attr('disabled', 'disabled');
  $(id).prop('disabled', true);
}

function showButtons(id){
  $(id).attr('class', 'btn btn-default');
  $(id).attr('disabled', '');
  $(id).prop('disabled', false);
}
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


$('.attackButtons').click(function() {
      hideButtons('.attackButtons');
      var btn = $(this);
      // btn.prop('disabled', true);
      if (b.isDead()) {
        print(b.name + ' is dead')
      } else {
          setTimeout(function() {
              behavior(b, a)
          }, 3000);
      }
  });