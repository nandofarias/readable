import user from '../../reducers/user';
import { getUser } from '../../utils/storage';
jest.mock('../../utils/storage');

describe('/reducers/user', () => {
  it('should return the default state when user is not logged', () => {
    expect(user(undefined, { type: 'NONE' })).toEqual({ isLoggedIn: false });
  });

  it('should return the defaul state when user is logged', () => {
    getUser.mockReturnValueOnce({ username: 'test', token: '123' });
    expect(user(undefined, { type: 'NONE' })).toEqual({
      username: 'test',
      token: '123',
      isLoggedIn: true
    });
  });

  it('should return user when user login', () => {
    const previousState = { isLoggedIn: false };
    const userObj = { username: 'test', token: '123' };
    const action = { type: 'RECEIVE_LOGIN', user: userObj };
    expect(user(previousState, action)).toEqual({ ...userObj, isLoggedIn: true });
  });

  it('should return return user logout', () => {
    const previousState = { username: 'test', token: '123' };
    expect(user(previousState, { type: 'LOGOUT' })).toEqual({ isLoggedIn: false });
  });
});
