import * as storage from '../../utils/storage';

describe('/utils/storage', () => {
  beforeEach(() => {
    global.localStorage = {
      setItem: jest.fn(() => true),
      getItem: jest.fn(),
      removeItem: jest.fn(() => true)
    };
  });
  it('should save user on localStorage', () => {
    const user = { username: 'test', token: 'test' };
    expect(storage.saveUser(user)).toEqual(true);
  });

  it('should get user from localStorage when exists', () => {
    const user = '{ "username": "test", "token": "test" }';
    global.localStorage.getItem.mockReturnValueOnce(user);
    expect(storage.getUser()).toEqual({ token: 'test', username: 'test' });
  });

  it('should return null when get user from localStorage if not exist', () => {
    expect(storage.getUser()).toEqual(null);
  });

  it('should clear user on localStorage', () => {
    expect(storage.clearUser()).toEqual(true);
  });
});
