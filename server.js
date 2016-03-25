const express = require('express');
const app = express();
const bp = require('body-parser');
const port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
const ipAdress = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))
app.use(bp.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/post/', (req, res) => {
  console.log('hello');
  console.log(req.body);
  res.send('hello');
})

app.listen(port, ipAdress, () => {
  console.log(`listening on ${ipAdress}, port ${port}`);
});
