const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/accountRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');
const playlistsRoutes = require('./routes/playlistsRoutes');
const cookieParser = require('cookie-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());
//see: https://enable-cors.org/server_expressjs.html
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//routes
app.use('/account', accountRoutes);
app.use('/spotify', spotifyRoutes);
app.use('/playlists', playlistsRoutes);

app.use(express.static(__dirname + '/build'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

mongoose.connect('mongodb://localhost:27017/data/db')
.then(() => {
  //console.log('Successfully connected to mongodb');
  app.listen(port, () => {
    //console.log('Server is listening on port', port);
  });
})
.catch(err => {
  //console.log('Error connecting to mongodb', err);
})

module.exports = app;
