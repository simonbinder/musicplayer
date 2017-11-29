const http = require('http');
const port = 8000;
const router = require('./routes/router');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/data/db')
  .then(() => {
    console.log('Successfully connected to mongodb');
  })
  .catch(err => {
    console.log('Error connecting to mongodb', err);
  })

const server = http.createServer((request, response) => {
  router.dispatch(request, response);
});

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
