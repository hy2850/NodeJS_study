// 웹 소켓 로직 - Socket.io 사용
const SocketIO = require('socket.io');

module.exports = (server) => {
  const io = SocketIO(server, { path: '/orange' }); // 💡 path must match with client!

  io.on('connection', (socket) => {
    // 웹소켓 연결 시
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);
    socket.on('disconnect', () => {
      // 연결 종료 시
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on('error', (error) => {
      // 에러 시
      console.error(error);
    });
    // 👉🏻 custom event
    socket.on('reply', (data) => {
      // 클라이언트로부터 메시지
      console.log(data);
    });
    socket.interval = setInterval(() => {
      // 3초마다 클라이언트로 메시지 전송
      socket.emit('news', 'Hello Socket.IO'); // 👉🏻 이벤트 이름, 데이터
    }, 3000);
  });
};
