import reducer from '../../reducers/categories';

describe('/reducers/categories', () => {
  it('should return the default state', () => {
    expect(reducer(undefined, { type: 'NONE' })).toEqual([]);
  });

  it('should return the categories', () => {
    const action = { type: 'RECEIVE_CATEGORIES', categories: [1, 2, 3] };
    expect(reducer([], action)).toEqual([1, 2, 3]);
  });
});
