const request = require('supertest');
const { sequelize } = require('../models');
const app = require('../app');

beforeAll(async () => {
  await sequelize.sync(); // 데이터베이스 테이블 생성
});

describe('POST /join', () => {
  // 회원가입 테스트
  test('로그인 안 했으면 가입', (done) => {
    request(app)
      .post('/auth/join')
      .send({
        email: 'zerohch0@gmail.com', // req.body에 들어감
        nick: 'zerocho',
        password: 'nodejsbook',
      })
      .expect('Location', '/')
      .expect(302, done); // redirect라서 302인 듯
  });
});

describe('POST /login', () => {
  const agent = request.agent(app); // 로그인 해놓을 계정이라고 생각

  // 각 테스트에 앞서 먼저 실행되는 부분 - 로그인 수행
  beforeEach((done) => {
    agent
      .post('/auth/login')
      .send({
        email: 'zerohch0@gmail.com',
        password: 'nodejsbook',
      })
      .end(done);
  });

  // POST auth/login 의 isNotLoggedIn 테스트
  test('이미 로그인했으면 redirect /', (done) => {
    const message = encodeURIComponent('로그인한 상태입니다.');
    agent
      .post('/auth/join')
      .send({
        email: 'zerohch0@gmail.com',
        nick: 'zerocho',
        password: 'nodejsbook',
      })
      .expect('Location', `/?error=${message}`)
      .expect(302, done);
  });
});

// 데이터를 정리하는 코드
// DB에 데이터 남아있으면 다음 테스트에 영향 줄 수도 있음 (ex. 회원가입한 정보가 계속 남아서 다음 테스트 회원가입 시 에러)
// 그래서 테이블 싹다 새로 만들어서 초기화!
afterAll(async () => {
  await sequelize.sync({ force: true }); // 테이블을 다시 만듦
});
