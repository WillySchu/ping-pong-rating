const express = require('express');
const app = express();
const port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
const ipAdress = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, ipAdress, () => {
  console.log(`listening on ${ipAdress}, port ${port}`);
});
