const http = require('http'); // http模块是自带的

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('Hello World\n');
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});