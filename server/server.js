const http = require('http');
const port = 8000;
const router = require('./routes/router');

const server = http.createServer((request, response) => {
  router.dispatch(request, response);
});

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
