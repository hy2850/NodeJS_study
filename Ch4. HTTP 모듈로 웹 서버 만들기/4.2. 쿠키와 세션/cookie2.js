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

const server = http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  if (req.url.startsWith('/login')) {
    // 😡 Deprecated! (Still works though)
    // const { query } = url.parse(req.url);
    // const { name } = qs.parse(query);

    // 😃 Localhost는 req.url에 host 없이 pathname만 전달돼서 baseURL 꼭 넣어주기 WHATWG 방식 사용 불가
    const baseURL = `http://localhost:${PORT}`;
    const parsedUrl = new URL(req.url, baseURL);
    const name = parsedUrl.searchParams.get('name');

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `name=${encodeURIComponent(
        name,
      )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });
    res.end();
  } else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`${cookies.name}님 안녕하세요`);
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
