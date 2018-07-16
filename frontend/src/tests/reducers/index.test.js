import reducers from '../../reducers';
import { createStore } from 'redux';
jest.mock('../../utils/storage');

describe('/reducers/index', () => {
  it('should return all reducers', () => {
    const store = createStore(reducers);
    expect(store.getState().categories).toEqual([]);
    expect(store.getState().posts).toEqual([]);
    expect(store.getState().comments).toEqual({});
    expect(store.getState().user).toEqual({ isLoggedIn: false });
  });
});
