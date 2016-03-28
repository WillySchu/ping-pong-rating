const express = require('express');
const app = express();
const bp = require('body-parser');
const fs = require('fs');
const Firebase = require('firebase');
const database = new Firebase('https://pingpongratings.firebaseio.com');
const path = require('path');
const dbPath = path.join(__dirname, 'db.json');
const port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
const ipAdress = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))
app.use(bp.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/postGame/', (req, res) => {
  //const promise = readFile();
  //promise.then((data) => {
    database.push(req.body);
    // fs.writeFile(dbPath, JSON.stringify(data), (writeErr) => {
    //   if(writeErr) throw writeErr;
    // });
    res.send('done');
  //});
});

app.post('/postPlayer/', (req, res) => {
  const promise = readFile();
  promise.then((data) => {

  });
});

app.listen(port, ipAdress, () => {
  console.log(`listening on ${ipAdress}, port ${port}`);
});

function readFile() {
  const myPromise = new Promise(function(resolve, reject) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return reject(err);

      resolve(JSON.parse(data));
    });
  });
  return myPromise;
}
