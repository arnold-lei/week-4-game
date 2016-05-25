function hideButtons(){
  $('button').attr('class', 'btn btn-default btn-disabled');
  $('button').attr('disabled', 'disabled');
  $('button').prop('disabled', true);
}

function showButtons(){
  $('button').attr('class', 'btn btn-default');
  $('button').attr('disabled', '');
  $('button').prop('disabled', false);
}

