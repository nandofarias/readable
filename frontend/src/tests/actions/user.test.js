import * as actions from '../../actions/user';
jest.mock('../../utils/api');
jest.mock('../../utils/storage');

describe('/actions/user', () => {
  it('should perform user login', async () => {
    const dispatch = jest.fn();
    await actions.login()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECEIVE_LOGIN',
      user: { username: 'test', token: '123' }
    });
  });

  it('should perform user logout', () => {
    const dispatch = jest.fn();
    actions.logout()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'LOGOUT' });
  });
});
