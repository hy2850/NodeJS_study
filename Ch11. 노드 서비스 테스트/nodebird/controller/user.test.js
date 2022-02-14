jest.mock('../models/user');
const User = require('../models/user');
const { addFollowing } = require('./user');

describe('addFollowing', () => {
  // ⭐️ dummy data, mocking functions
  const req = {
    user: { id: 1 },
    params: { id: 2 },
  };
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };
  const next = jest.fn();

  test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야 함', async () => {
    User.findOne.mockReturnValue(
      // ⭐️ await시 addFollowing 함수를 담은 obj 반환
      Promise.resolve({
        addFollowing(id) {
          return Promise.resolve(true);
        },
      }),
    );
    await addFollowing(req, res, next);
    expect(res.send).toBeCalledWith('success');
  });

  test('사용자를 못 찾으면 res.status(404).send("no user")를 호출함', async () => {
    User.findOne.mockReturnValue(null); // 👉🏻 if(user) 못 통과하고 else로 넘어감
    await addFollowing(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith('no user');
  });

  test('DB findOne에러 발생 시 next(error) 호출', async () => {
    const error = 'Sequelize findOne 에러';
    User.findOne.mockReturnValue(Promise.reject(error)); // 👉🏻 catch(error)로 넘어감
    await addFollowing(req, res, next);
    expect(next).toBeCalledWith(error);
  });

  test('DB addFollowing에러 발생 시 next(error) 호출', async () => {
    const error = 'Sequelize addFollowing 에러';
    User.findOne.mockReturnValue(
      Promise.resolve({
        addFollowing(id) {
          return Promise.reject(error); // 👉🏻 if(user)는 통과하나, catch(error)로 넘어감
        },
      }),
    );
    await addFollowing(req, res, next);
    expect(next).toBeCalledWith(error);
  });
});
