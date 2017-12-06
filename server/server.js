const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/accountRoutes');
//routes
app.use('/account', accountRoutes);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())
//see: https://enable-cors.org/server_expressjs.html
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/build'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(port, () => {
  console.log('Server is listening on port', port);
});

mongoose.connect('mongodb://localhost:27017/data/db')
.then(() => {
  console.log('Successfully connected to mongodb');
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
})
.catch(err => {
  console.log('Error connecting to mongodb', err);
})
