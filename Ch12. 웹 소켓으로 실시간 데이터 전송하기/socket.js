const SocketIO = require('socket.io');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');
const Logger = require('./logger');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io); // 👉🏻 라우터에서도 io 쓸 수 있게 (req.app.get('io'))

  // ⭐️ Namespace 만들기
  const room = io.of('/room');
  const chat = io.of('/chat');

  // 😡 (Debugging) Socket.io v4 error
  const wrap = (middleware) => (socket, next) =>
    middleware(socket.request, {}, next);
  chat.use(wrap(cookieParser(process.env.COOKIE_SECRET)));
  chat.use(wrap(sessionMiddleware));

  // room.use(wrap(cookieParser(process.env.COOKIE_SECRET)));
  room.use(wrap(sessionMiddleware));
  // io.use(wrap(sessionMiddleware)); // 🔥 doesn't work when connecting to namespaces

  room.on('connection', (socket) => {
    const userId = socket.request.session.color;
    Logger.warn(`${userId} room 네임스페이스에 접속`);
    socket.on('disconnect', () => {
      Logger.warn(`${userId} room 네임스페이스에서 접속 해제`);
    });
  });

  chat.on('connection', (socket) => {
    const req = socket.request;
    const {
      headers: { referer }, // 👉🏻 URL from main.html 'addBtnEvent' function
    } = req;
    const roomId = referer
      .split('/')
      [referer.split('/').length - 1].replace(/\?.+/, '');

    Logger.warn(`${req.session.color} chat 네임스페이스 ${roomId}에 접속`);

    socket.join(roomId);
    /*
    코드 설명
    const referer = 'http://localhost:8080/room/orange?password=1234';
    const lastPart = referer.split('/')[referer.split('/').length - 1]; // orange?password=1234
    const roomId = lastPart.replace(/\?.+/, ''); // orange
    */

    // 👉🏻 to all clients in the room except the sender
    socket.to(roomId).emit('join', {
      user: 'system',
      chat: `${req.session.color}님이 입장하셨습니다.`,
    });

    socket.on('disconnect', () => {
      Logger.warn(
        `${req.session.color} chat 네임스페이스 ${roomId}에 접속 해제`,
      );
      socket.leave(roomId);

      // 😡 (Debugging) Socket.io v4 error
      const currentRoom = socket.adapter.rooms.get(
        socket.handshake.query.roomId, // 아니면 그냥 위에서 구한 roomId 써도 됨
      );
      const userCount = currentRoom ? currentRoom.size : 0;

      if (userCount === 0) {
        // 유저가 0명이면 방 삭제
        const signedCookie = cookie.sign(
          req.signedCookies['connect.sid'],
          process.env.COOKIE_SECRET,
        );
        const connectSID = `${signedCookie}`;
        axios
          .delete(`http://localhost:8005/room/${roomId}`, {
            headers: {
              Cookie: `connect.sid=s%3A${connectSID}`,
            },
          })
          .then(() => {
            console.log('방 제거 요청 성공');
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        socket.to(roomId).emit('exit', {
          user: 'system',
          chat: `${req.session.color}님이 퇴장하셨습니다.`,
        });
      }
    });
  });
};
