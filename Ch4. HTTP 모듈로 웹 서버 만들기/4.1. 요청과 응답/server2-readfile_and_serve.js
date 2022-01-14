// const http = require('http')
// const fs = require('fs')
import * as http from 'http';
import * as fs from 'fs';

const server = http.createServer((req, res) => {
  // 👺 해결책 1) readFileSync
  // const data = fs.readFileSync('./server2.html');
  // res.write(data);

  fs.readFile('./server2.html', (err, data) => {
    if (err) throw err;
    res.write(data);
  });

  res.end('Hello?'); // 👺
  /*
    ⭐️
    fs.readFile works asynchronously & non-blocking,
    so this line executes first, terminating server response.
    File being read is not sent!
    -> 해결법 : readFileSync 쓰거나, await-async로 바꾸기
    */
});

const PORT = 8080;
server.listen(8080);
server.on('listening', () => {
  console.log(`Listening on ${PORT}`);
});
server.on('error', (err) => {
  console.error(err);
});
