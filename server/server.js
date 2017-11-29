const port = 8000;
const express = require('express');
const app = express();

app.listen(port, () => {
  console.log('Server is listening on port', port);
});

app.use(express.static(__dirname + '/build'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});
