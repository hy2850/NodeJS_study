import http from 'http';
import cluster from 'cluster';
import { cpus } from 'os';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  // CPU 개수만큼 워커를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  // 워커가 종료되었을 때
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log('code', code, 'signal', signal);
    // cluster.fork(); // 워커 다시 생성
  });
} else {
  // 워커들이 포트에서 대기 - ⭐️ when a new client accesses the server, any idle worker become active
  http
    .createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write('<h1>Hello Node!</h1>');
      res.end('<p>Hello Cluster!</p>');
      setTimeout(() => {
        // 워커 존재를 확인하기 위해 1초마다 강제 종료
        process.exit(1);
      }, 1000);
    })
    .listen(8080);

  console.log(`${process.pid}번 워커 실행`);
}
