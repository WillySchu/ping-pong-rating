$.ajax({
  type: 'GET',
  url: '/load/',
  success: (data) => {
    appendSelect(data);
    appendTable(data);
  }
});

$('#newplayer').on('submit', (event) => {
  event.preventDefault();
  const player = $('#name').val();
  const skill = $('#skill').val();
  const data = {player: player, skill: skill}

  $.ajax({
    type: 'POST',
    url: '/postPlayer/',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: (data) => {
      appendSelect(data);
      appendTable(data);
    }
  });
});

function appendSelect(data) {
  $('.winner').empty();
  $('.loser').empty();
  for (var i = 0; i < data.length; i++) {
        $('.winner').append($('<option></option>').val(data[i].name).html(data[i].name));
        $('.loser').append($('<option></option>').val(data[i].name).html(data[i].name));
  }
}

$('#game').on('submit', (event) => {
  event.preventDefault();
  const winner = $('.winner').val();
  const loser = $('.loser').val();
  const data = {winner: winner, loser: loser};

  $.ajax({
    type: 'POST',
    url: '/postGame/',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: (data) => {
      appendTable(data);
    }
  });
});

function appendTable(data) {
  $('.ranking-table').empty();
  $('.ranking-table').append(
    '<tr><th>player</th><th>win/loss ratio</th><th>rating</th></tr>');

  for (var i = 0; i < data.length; i++) {
    var $tr = $('<tr></tr>').append($('<td></td>').html(data[i].name));
    $tr.append($('<td></td>').html('.85'));
    $tr.append($('<td></td>').html(data[i].rating));
      $('.ranking-table').append($tr);
  }
}
