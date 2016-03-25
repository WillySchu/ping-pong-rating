const database = new Firebase('https://pingpongratings.firebaseio.com');

$('form').on('submit', () => {
  const winner = $('#winner').val();
  const loser = $('#loser').val();

  database.push({winner: winner, loser: loser});
});

// function expOutcome(ratingA, ratingB) {
//   return 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400))
// };
//
// function newRanking(oldRanking, eOutcome, aOutcome, kConstant) {
//   return oldRanking + kConstant * (aOutcome - eOutcome);
// }
