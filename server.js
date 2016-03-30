'use strict';

const express = require('express');
const app = express();
const bp = require('body-parser');
const fs = require('fs');
const knex = require('./db/knex');
const path = require('path');
const dbPath = path.join(__dirname, 'db.json');
const port = process.env.PORT || 8000;
 const ipAdress = process.env.IP || '0.0.0.0';
const kConst = 20;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))
app.use(bp.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/load/', (req, res) => {
  knex('players').select().orderBy('rating', 'desc').then((data) => {
    res.status(200).send(data);
  });
});

app.post('/postGame/', (req, res) => {
  knex('players').select().where({name: req.body.winner}).orWhere({name: req.body.loser}).then((data) => {

    if (req.body.winner === data[1].name) {
      data.push(data.shift());
    }

    updateRatings(data[0].name, data[0].rating, data[1].name, data[1].rating).then((data) => {
      res.status(200).send(data);
    });

    logGame(data[0].name, data[1].name);

  //   const name1 = data[0].name;
  //   const expOutcome1 = expOutcome(data[0].rating, data[1].rating);
  //   const newRating1 = Math.floor(newRating(data[0].rating, expOutcome1, 1, kConst));
  //
  //   const name2 = data[1].name;
  //   const expOutcome2 = expOutcome(data[1].rating, data[0].rating);
  //   const newRating2 = Math.floor(newRating(data[1].rating, expOutcome2, 0, kConst));
  //
  //   knex('players').where({name: name1}).update({rating: newRating1}).then((data) => {
  //
  //   });
  //   knex('players').where({name: name2}).update({rating: newRating2}).then((data) => {
  //     knex('players').select().orderBy('rating', 'desc').then((data) => {
  //       res.status(200).send(data);
  //     });
  //     knex('players').select(['id', 'name']).where({name: name1}).orWhere({name: name2}).then((data) => {
  //       let winner;
  //       let loser;
  //       if (data[0].name === name1) {
  //         winner = data[0].id;
  //         loser = data[1].id;
  //       } else {
  //         winner = data[1].id;
  //         loser = data[0].id;
  //       }
  //       knex('games').insert({winner: winner, loser: loser}).then((data) => {
  //
  //       });
  //     });
  //   });
  });
});

app.post('/postPlayer/', (req, res) => {
  const player = req.body.player.toLowerCase();
  knex('players').select('name').where({name: player}).then((data) => {
    if (data[0] && data[0].name === player) {
      res.status(400).send('Player already exists');
    } else {
      knex('players').insert({name: player, rating: 1200}).then((data) => {
        knex('players').select().orderBy('rating', 'desc').then((data) => {
          res.status(200).send(data);
        });
      });
    }
  });
});

app.listen(port, ipAddress, () => {
  console.log(`listening on ${ipAdress}, port ${port}`);
});

function expOutcome(ratingA, ratingB) {
  return 1 / (1 + Math.pow(10, (parseInt(ratingA, 10) - parseInt(ratingB, 10)) / 400))
};

function newRating(oldRating, eOutcome, aOutcome, kConstant) {
  return parseInt(parseInt(oldRating, 10) + kConstant * (aOutcome - parseFloat(eOutcome)), 10);
};

function wlRatio(playerID) {
  'use strict';
  let wins = 0;
  let losses = 0;
  const promise = new Promise((resolve, reject) => {
    knex('games').select().where({winner: playerID}).orWhere({loser: playerID}).then((data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].winner === playerID) {
          wins += 1;
        }
        if (data[i].loser === playerID) {
          losses += 1;
        }
      }
      resolve(wins / losses);
    });
  })
  return promise;
}

function updateRatings(winnerName, winnerRating, loserName, loserRating) {
  const expWOut = expOutcome(winnerRating, loserRating);
  const newWRat = newRating(winnerRating, expWOut, 1, kConst);
  const expLOut = expOutcome(loserRating, winnerRating);
  const newLRat = newRating(loserRating, expLOut, 0, kConst);
  const promise = new Promise((resolve, reject) => {
    knex('players').where({name: winnerName}).update({rating: newWRat}).then((wd) => {
      knex('players').where({name: loserName}).update({rating: newLRat}).then((ld) => {
        knex('players').select().orderBy('rating', 'desc').then((data) => {
          resolve(data);
        });
      });
    });
  });
  return promise;
}

function logGame(winner, loser, req, res) {
  knex('players').select(['id', 'name']).where({name: winner}).orWhere({name: loser}).then((data) => {
    let winnerID;
    let loserID;
    if (data[0].name === winner) {
      winnerID = data[0].id;
      loserID = data[1].id;
    } else {
      winnerID = data[1].id;
      loserID = data[0].id;
    }
    knex('games').insert({winner: winnerID, loser: loserID}).then((data) => {

    });
  });
}
