$(document).ready(function() {
    $('.sign-up-tab').on('click', function(event) {
      $('.sign-up').toggleClass('sign-up-show');
      $('.ranking').toggleClass('ranking-move');
    });

    $('.game-score-tab').on('click', function(event) {
      $('.game-score').toggleClass('game-score-show');
      $('.ranking').toggleClass('ranking-move');
    });

 });
