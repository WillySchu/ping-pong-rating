const database = new Firebase('https://pingpongratings.firebaseio.com');

$('form').on('submit', (event) => {
  event.preventDefault();
  const winner = $('#winner').val();
  const loser = $('#loser').val();
  const data = {winner: winner, loser: loser};
  database.push({winner: winner, loser: loser});
  console.log(JSON.stringify(data));

  $.ajax({
    type: "POST",
    url: "http://0.0.0.0:8000/post/",
    data: JSON.stringify(data),
    contentType: 'application/json'
  });
});

function expOutcome(ratingA, ratingB) {
  return 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400))
};

function newRanking(oldRanking, eOutcome, aOutcome, kConstant) {
  return oldRanking + kConstant * (aOutcome - eOutcome);
}
