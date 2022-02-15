// 웹 소켓 로직
const WebSocket = require('ws');

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    // 웹소켓 연결 시
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // ⭐️ 클라이언트의 IP를 알아내는 유명한 방법 중 하나
    console.log('새로운 클라이언트 접속', ip);
    ws.on('message', (message) => {
      // 클라이언트로부터 메시지
      console.log(message.toString());
    });
    ws.on('error', (error) => {
      // 에러 시
      console.error(error);
    });
    ws.on('close', () => {
      // 연결 종료 시
      console.log('클라이언트 접속 해제', ip);
      clearInterval(ws.interval);
    });

    ws.interval = setInterval(() => {
      // 3초마다 클라이언트로 메시지 전송
      if (ws.readyState === ws.OPEN) {
        ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
      }
    }, 3000);
  });
};
