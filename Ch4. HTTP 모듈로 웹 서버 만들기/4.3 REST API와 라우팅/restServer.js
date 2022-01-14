import * as http from 'http';
import * as fs from 'fs/promises';

const users = {}; // 데이터 저장용

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET') {
      console.log('GET', req.url);

      if (req.url === '/') {
        const data = await fs.readFile('./restFront.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      }
      if (req.url === '/users') {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
        });
        return res.end(JSON.stringify(users)); // ❓ Why use JSON.stringify?
      }

      /**
       * GET /restFront.css, GET /restFront.js file request 들어왔을 때, 이 코드에서 파일 읽어서 제공!
       * Without this code, file is not sent back to the client
       */
      try {
        const data = await fs.readFile(`.${req.url}`);
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Not Found error');
      }
    } else if (req.method === 'POST') {
      console.log('POST');

      // (restFront.js) submit button sends POST req to '/user'
      if (req.url === '/user') {
        let body = '';

        // ⭐️ req -> readable stream : has 'data' and 'end' events
        // https://stackoverflow.com/a/41521743/9720700
        req.on('data', (data) => {
          body += data;
        });

        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { name } = JSON.parse(body);
          const id = Date.now();
          users[id] = name;
          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('ok');
        });
      }
    } else if (req.method === 'PUT') {
      console.log('PUT');
    } else if (req.method === 'DELETE') {
      console.log('DELETE');
    } else {
      throw new Error('Unexpected request');
    }
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
