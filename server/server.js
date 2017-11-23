const http = require('http');
const port = 8000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify({
    success: true,
  }));
});

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
