// const http = require('http')
// const fs = require('fs')
import * as http from 'http';
import * as fs from 'fs';

// 업그레이드 - promise로
// import {promisify} from 'util';
import * as util from 'util'; // const util = require('util') 와 동일

const readFile = util.promisify(fs.readFile);

// Promise ver
// const server = http.createServer((req, res)=>{
//     readFile('./server2.html')
//         .then(data => {
//             res.write(data);
//         })
//         .catch(error => {
//             throw err;
//         });
// });

// Async-Await ver
const server = http.createServer(async (req, res) => {
  try {
    const data = await readFile('./server2.html');
    res.write(data);
    res.end('The End');
  } catch (err) {
    console.error(err);
  }
});

const PORT = 8080;
server.listen(8080);
server.on('listening', () => {
  console.log(`Listening on ${PORT}`);
});
server.on('error', (err) => {
  console.error(err);
});
