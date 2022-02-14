const request = require('supertest');
const { sequelize } = require('../models');
const app = require('../app');

beforeAll(async () => {
  await sequelize.sync(); // 데이터베이스 테이블 생성
});

describe('POST /login', () => {
  test('로그인 수행', (done) => {
    request(app)
      .post('/auth/login')
      .send({
        email: 'zerohch0@gmail.com',
        password: 'nodejsbook',
      })
      .expect('Location', '/') // ❌ Test fails here - 가입되지 않는 회원이라
      .expect(302, done);
  });
});
