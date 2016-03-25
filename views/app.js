const database = new Firebase('https://pingpongratings.firebaseio.com');

$('form').on('submit', () => {
  const winner = $('#winner').val();
  const loser = $('#loser').val();
  const data = {winner: winner, loser: loser};
  database.push({winner: winner, loser: loser});

  $.ajax({
    type: "POST",
    url: "http://0.0.0.0:8000/post/",
    data: data
  });
});

function expOutcome(ratingA, ratingB) {
  return 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400))
};

function newRanking(oldRanking, eOutcome, aOutcome, kConstant) {
  return oldRanking + kConstant * (aOutcome - eOutcome);
}
