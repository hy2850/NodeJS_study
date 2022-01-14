import * as http from 'http';
import * as fs from 'fs/promises';
import * as url from 'url';
import * as qs from 'querystring';

/*
@Arg : mycookie=test
@Return : { mycookie: 'test' }
*/
const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const session = {};

const server = http.createServer(async (req, res) => {
  // console.log(req.headers);
  const cookies = parseCookies(req.headers.cookie);
  if (req.url.startsWith('/login')) {
    const baseURL = `http://localhost:${PORT}`;
    const parsedUrl = new URL(req.url, baseURL);
    const name = parsedUrl.searchParams.get('name');

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    const uniqueInt = Date.now();

    session[uniqueInt] = {
      name,
      expires,
    };

    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });
    res.end();
    // 세션쿠키가 존재하고, 만료 기간이 지나지 않았다면
  } else if (cookies.session && session[cookies.session].expires > new Date()) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`${session[cookies.session].name}님 안녕하세요`);
  } else {
    try {
      const data = await fs.readFile('./cookie2.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(error.message);
    }
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
