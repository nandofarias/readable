import reducer from '../../reducers/comments';

describe('/reducers/comments', () => {
  it('should return the default state', () => {
    const action = { type: 'NONE' };
    expect(reducer(undefined, action)).toEqual({});
  });

  it('should return the default state when there is no comment for a post', () => {
    const action = { type: 'RECEIVE_COMMENTS', comments: [] };
    expect(reducer({}, action)).toEqual({});
  });

  it('should return a new key/value pair for comments when receive a list', () => {
    const action = {
      type: 'RECEIVE_COMMENTS',
      comments: [{ parentId: 'test01', title: 'test', body: 'test' }]
    };
    expect(reducer({}, action)).toEqual({
      test01: [{ parentId: 'test01', title: 'test', body: 'test' }]
    });
  });

  it('should return a comment with up vote', () => {
    const previousState = {
      test01: [
        { parentId: 'test01', id: 'test01', title: 'test', voteCount: 0 },
        { parentId: 'test01', id: 'test02', title: 'test', voteCount: 0 }
      ]
    };
    const action = {
      type: 'RECEIVE_COMMENT_UP_VOTE',
      comment: { parentId: 'test01', id: 'test01', title: 'test', voteCount: 1 }
    };
    expect(reducer(previousState, action)).toEqual({
      test01: [
        { parentId: 'test01', id: 'test01', title: 'test', voteCount: 1 },
        { parentId: 'test01', id: 'test02', title: 'test', voteCount: 0 }
      ]
    });
  });

  it('should return a comment with down vote', () => {
    const previousState = {
      test01: [
        { parentId: 'test01', id: 'test01', title: 'test', voteCount: 1 },
        { parentId: 'test01', id: 'test02', title: 'test', voteCount: 1 }
      ]
    };
    const action = {
      type: 'RECEIVE_COMMENT_DOWN_VOTE',
      comment: { parentId: 'test01', id: 'test01', title: 'test', voteCount: 0 }
    };
    expect(reducer(previousState, action)).toEqual({
      test01: [
        { parentId: 'test01', id: 'test01', title: 'test', voteCount: 0 },
        { parentId: 'test01', id: 'test02', title: 'test', voteCount: 1 }
      ]
    });
  });

  it('should return a edited comment', () => {
    const previousState = {
      test01: [
        { parentId: 'test01', id: 'test01', title: 'test' },
        { parentId: 'test01', id: 'test02', title: 'test' }
      ]
    };
    const action = {
      type: 'RECEIVE_UPDATED_COMMENT',
      comment: { parentId: 'test01', id: 'test01', title: 'new-test' }
    };
    expect(reducer(previousState, action)).toEqual({
      test01: [
        { parentId: 'test01', id: 'test01', title: 'new-test' },
        { parentId: 'test01', id: 'test02', title: 'test' }
      ]
    });
  });

  it('should return a deleted comment', () => {
    const previousState = {
      test01: [
        { parentId: 'test01', id: 'test01', title: 'test' },
        { parentId: 'test01', id: 'test02', title: 'test' }
      ]
    };
    const action = {
      type: 'RECEIVE_DELETED_COMMENT',
      comment: { parentId: 'test01', id: 'test01', title: 'test' }
    };
    expect(reducer(previousState, action)).toEqual({
      test01: [{ parentId: 'test01', id: 'test02', title: 'test' }]
    });
  });

  it('should return a new comment when array has no one', () => {
    const previousState = {};
    const action = {
      type: 'RECEIVE_NEW_COMMENT',
      comment: { parentId: 'test01', id: 'test01', title: 'test' }
    };
    expect(reducer(previousState, action)).toEqual({
      test01: [{ parentId: 'test01', id: 'test01', title: 'test' }]
    });
  });

  it('should return a new comment when array already has at least one', () => {
    const previousState = {
      test01: [{ parentId: 'test01', id: 'test01', title: 'test' }]
    };
    const action = {
      type: 'RECEIVE_NEW_COMMENT',
      comment: { parentId: 'test01', id: 'test02', title: 'test' }
    };
    expect(reducer(previousState, action)).toEqual({
      test01: [
        { parentId: 'test01', id: 'test01', title: 'test' },
        { parentId: 'test01', id: 'test02', title: 'test' }
      ]
    });
  });
});
