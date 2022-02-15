const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io); // 👉🏻 라우터에서도 io 쓸 수 있게 (req.app.get('io'))

  // ⭐️ Namespace 만들기
  const room = io.of('/room');
  const chat = io.of('/chat');

  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');
    const req = socket.request;
    const {
      headers: { referer }, // 👉🏻 URL from main.html 'addBtnEvent' function
    } = req;
    const roomId = referer
      .split('/')
      [referer.split('/').length - 1].replace(/\?.+/, '');
    socket.join(roomId);
    /*
    코드 설명
    const referer = 'http://localhost:8080/room/orange?password=1234';
    const lastPart = referer.split('/')[referer.split('/').length - 1]; // orange?password=1234
    const roomId = lastPart.replace(/\?.+/, ''); // orange
    */

    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
      socket.leave(roomId);
    });
  });
};
