$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})

// <input type="text" class="form-control" id="characterName" placeholder="Arnold">

function printStats(player){
  var stats = ['name', 'vit', 'str', 'dex', 'int', 'ac', 'fury'];
  for(var prop in player){
      if(stats.indexOf(prop) !== -1){
      // var newDiv = $('<li> ' + prop + ':' + ' ' + player[prop]+' </li>')
      var newDiv = $('<label for="exampleInputName2">'+prop+'</label><input type="text" class="form-control" id="characterName" placeholder="'+ player[prop]+'">')
      $('.playerStats').append(newDiv);
      }
  }
}

function charName(a) {
    var newName = document.getElementById("characterName").value;
    a.name = newName;
    printPlayerStats(a)
}