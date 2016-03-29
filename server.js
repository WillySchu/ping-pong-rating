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
    res.send(data);
  });
});

app.post('/postGame/', (req, res) => {
  knex('players').select().where({name: req.body.winner}).orWhere({name: req.body.loser}).then((data) => {

    if (req.body.winner === data[0].name) {
      data.push(data.shift());
    }

    const name1 = data[0].name;
    const expOutcome1 = expOutcome(data[0].rating, data[1].rating);
    const newRating1 = Math.floor(newRating(data[0].rating, expOutcome1, 0, kConst));
    console.log(newRating1);

    const name2 = data[1].name;
    const expOutcome2 = expOutcome(data[1].rating, data[0].rating);
    const newRating2 = Math.floor(newRating(data[1].rating, expOutcome2, 1, kConst));
    console.log(newRating2);

    knex('players').where({name: name1}).update({rating: newRating1}).then((data) => {

    });
    knex('players').where({name: name2}).update({rating: newRating2}).then((data) => {
      knex('players').select().orderBy('rating', 'desc').then((data) => {
        res.send(data);
      });
    });
  });
});

app.post('/postPlayer/', (req, res) => {
  knex('players').insert({name: req.body.player, rating: 1200}).then((data) => {
    console.log(req.body.player);
    knex('players').select().orderBy('rating', 'desc').then((data) => {
      res.send(data);
    });
  });
});

app.listen(port, ipAdress, () => {
  console.log(`listening on ${ipAdress}, port ${port}`);
});

function expOutcome(ratingA, ratingB) {
  return 1 / (1 + Math.pow(10, (parseInt(ratingA, 10) - parseInt(ratingB, 10)) / 400))
};

function newRating(oldRating, eOutcome, aOutcome, kConstant) {
  return parseInt(oldRating, 10) + kConstant * (aOutcome - parseFloat(eOutcome));
};
