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

