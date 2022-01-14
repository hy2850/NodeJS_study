const http = require('http');

const server = http.createServer((req, res) => {
  res.write('<h1>Hello, world!</h1>');
  res.end('<p>My first server</p>');
});

const PORT = 8080;
server.listen(8080);
server.on('listening', () => {
  console.log(`Listening on ${PORT}`);
});
server.on('error', (err) => {
  console.error(err);
});
