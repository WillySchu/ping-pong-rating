$('#newplayer').on('submit', (event) => {
  event.preventDefault();
  const player = $('#name').val();
  const skill = $('#skill').val();
  const data = {player: player, skill: skill}

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:8000/postPlayer/',
    data: JSON.stringify(data),
    contentType: 'application/json'
  });
});

$('#game').on('submit', (event) => {
  event.preventDefault();
  const winner = $('#winner').val();
  const loser = $('#loser').val();
  const data = {winner: winner, loser: loser};
  console.log(data);

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:8000/postGame/',
    data: JSON.stringify(data),
    contentType: 'application/json'
  });
});
