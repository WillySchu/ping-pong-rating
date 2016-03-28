$.ajax({
  type: 'GET',
  url: 'http://0.0.0.0:8000/load/',
  success: (data) => {
    appendSelect(data);
  }
});

$('#newplayer').on('submit', (event) => {
  event.preventDefault();
  const player = $('#name').val();
  const skill = $('#skill').val();
  const data = {player: player, skill: skill}

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:8000/postPlayer/',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: (data) => {
      appendSelect(data);
    }
  });
});

function appendSelect(data) {
  for (var i = 0; i < data.length; i++) {
        $('.winner').append(
          $('<option></option>').val(data[i].name).html(data[i].name))
        $('.loser').append(
          $('<option></option>').val(data[i].name).html(data[i].name))
  }
}

$('#game').on('submit', (event) => {
  event.preventDefault();
  const winner = $('#winner').val();
  const loser = $('#loser').val();
  const data = {winner: winner, loser: loser};
  console.log(data.name);

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:8000/postGame/',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: (data) => {
      console.log(data);
    }
  });
});
