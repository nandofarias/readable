import reducer from '../../reducers/posts';

describe('/reducers/posts', () => {
  it('should return the default state', () => {
    const action = { type: 'NONE' };
    expect(reducer(undefined, action)).toEqual([]);
  });
  it('should return the state with a new list of posts', () => {
    const posts = [
      { id: 'test01', title: 'test', body: 'test' },
      { id: 'test02', title: 'test', body: 'test' }
    ];
    const action = { type: 'RECEIVE_POSTS', posts };
    expect(reducer([], action)).toEqual(posts);
  });
  it('should return the state with a up voted post', () => {
    const posts = [
      { id: 'test01', title: 'test', body: 'test', voteCount: 0 },
      { id: 'test02', title: 'test', body: 'test', voteCount: 0 }
    ];
    const action = {
      type: 'RECEIVE_POST_UP_VOTE',
      post: { id: 'test01', title: 'test', body: 'test', voteCount: 1 }
    };
    expect(reducer(posts, action)).toEqual([
      { id: 'test01', title: 'test', body: 'test', voteCount: 1 },
      { id: 'test02', title: 'test', body: 'test', voteCount: 0 }
    ]);
  });
  it('should return the state with a down vote post', () => {
    const posts = [
      { id: 'test01', title: 'test', body: 'test', voteCount: 1 },
      { id: 'test02', title: 'test', body: 'test', voteCount: 1 }
    ];
    const action = {
      type: 'RECEIVE_POST_DOWN_VOTE',
      post: { id: 'test01', title: 'test', body: 'test', voteCount: 0 }
    };
    expect(reducer(posts, action)).toEqual([
      { id: 'test01', title: 'test', body: 'test', voteCount: 0 },
      { id: 'test02', title: 'test', body: 'test', voteCount: 1 }
    ]);
  });
  it('should return the state with a edited post', () => {
    const posts = [
      { id: 'test01', title: 'test', body: 'test' },
      { id: 'test02', title: 'test', body: 'test' }
    ];
    const action = {
      type: 'RECEIVE_UPDATED_POST',
      post: { id: 'test01', title: 'test', body: 'new-test' }
    };
    expect(reducer(posts, action)).toEqual([
      { id: 'test01', title: 'test', body: 'new-test' },
      { id: 'test02', title: 'test', body: 'test' }
    ]);
  });
  it('should return the state with a deleted post', () => {
    const posts = [
      { id: 'test01', title: 'test', body: 'test' },
      { id: 'test02', title: 'test', body: 'test' }
    ];
    const action = {
      type: 'RECEIVE_DELETED_POST',
      post: { id: 'test01', title: 'test', body: 'test' }
    };
    expect(reducer(posts, action)).toEqual([{ id: 'test02', title: 'test', body: 'test' }]);
  });
  it('should return the state with a new post', () => {
    const posts = [{ id: 'test01', title: 'test', body: 'test' }];
    const action = {
      type: 'RECEIVE_NEW_POST',
      post: { id: 'test02', title: 'test', body: 'test' }
    };
    expect(reducer(posts, action)).toEqual([
      { id: 'test01', title: 'test', body: 'test' },
      { id: 'test02', title: 'test', body: 'test' }
    ]);
  });
  it('should return the state with a post with new comment', () => {
    const posts = [
      { id: 'test01', title: 'test', body: 'test', commentCount: 0 },
      { id: 'test02', title: 'test', body: 'test', commentCount: 0 }
    ];
    const action = {
      type: 'RECEIVE_NEW_COMMENT',
      comment: { id: 'test01', parentId: 'test01', body: 'test' }
    };
    expect(reducer(posts, action)).toEqual([
      { id: 'test01', title: 'test', body: 'test', commentCount: 1 },
      { id: 'test02', title: 'test', body: 'test', commentCount: 0 }
    ]);
  });
  it('should return the state with a post with deleted comment', () => {
    const posts = [
      { id: 'test01', title: 'test', body: 'test', commentCount: 1 },
      { id: 'test02', title: 'test', body: 'test', commentCount: 1 }
    ];
    const action = {
      type: 'RECEIVE_DELETED_COMMENT',
      comment: { id: 'test01', parentId: 'test01', body: 'test' }
    };
    expect(reducer(posts, action)).toEqual([
      { id: 'test01', title: 'test', body: 'test', commentCount: 0 },
      { id: 'test02', title: 'test', body: 'test', commentCount: 1 }
    ]);
  });
  it('should return the state with a single post with error', () => {
    const posts = [
      { id: 'test01', title: 'test', body: 'test', commentCount: 1 },
      { id: 'test02', title: 'test', body: 'test', commentCount: 1 }
    ];
    const action = {
      type: 'RECEIVE_SINGLE_POST',
      post: { error: 'test error' }
    };
    expect(reducer(posts, action)).toEqual([]);
  });
  it('should return the state with a single post empty', () => {
    const posts = [
      { id: 'test01', title: 'test', body: 'test', commentCount: 1 },
      { id: 'test02', title: 'test', body: 'test', commentCount: 1 }
    ];
    const action = {
      type: 'RECEIVE_SINGLE_POST',
      post: {}
    };
    expect(reducer(posts, action)).toEqual([]);
  });
  it('should return the state with a single post with success', () => {
    const posts = [{ id: 'test01', title: 'test', body: 'test', commentCount: 1 }];
    const action = {
      type: 'RECEIVE_SINGLE_POST',
      post: { id: 'test02', title: 'test', body: 'test', commentCount: 1 }
    };
    expect(reducer(posts, action)).toEqual([
      { id: 'test02', title: 'test', body: 'test', commentCount: 1 }
    ]);
  });
});
