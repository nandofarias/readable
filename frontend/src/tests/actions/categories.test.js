import { getCategories } from '../../actions/categories';
jest.mock('../../utils/api');

describe('/actions/categories', () => {
  it('should dispatch a list of categories', async () => {
    const dispatch = jest.fn();
    await getCategories()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECEIVE_CATEGORIES',
      categories: [
        {
          name: 'react',
          path: 'react'
        },
        {
          name: 'redux',
          path: 'redux'
        },
        {
          name: 'udacity',
          path: 'udacity'
        }
      ]
    });
  });
});
