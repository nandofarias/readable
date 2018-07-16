import * as actions from '../../actions/comments';
import * as api from '../../utils/api';
jest.mock('../../utils/api');

describe('/actions/comments', () => {
  it('should get comments', async () => {
    const dispatch = jest.fn();
    await actions.getComments('test01')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECEIVE_COMMENTS',
      comments: [
        { parentId: 'test01', id: 'test01', title: 'test', voteCount: 0 },
        { parentId: 'test01', id: 'test02', title: 'test', voteCount: 1 }
      ]
    });
    expect(api.getPostComments).toHaveBeenCalledWith('test01');
  });
  it('should up vote a comment', async () => {
    const dispatch = jest.fn();
    api.voteComment.mockClear();
    await actions.upVoteComment('test01')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECEIVE_COMMENT_UP_VOTE',
      comment: { parentId: 'test01', id: 'test01', title: 'test', voteCount: 0 }
    });
    expect(api.voteComment).toHaveBeenCalledWith('test01', 'upVote');
  });
  it('should down vote a comment', async () => {
    const dispatch = jest.fn();
    api.voteComment.mockClear();
    await actions.downVoteComment('test01')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECEIVE_COMMENT_DOWN_VOTE',
      comment: { parentId: 'test01', id: 'test01', title: 'test', voteCount: 0 }
    });
    expect(api.voteComment).toHaveBeenCalledWith('test01', 'downVote');
  });
  it('should delete a comment', async () => {
    const dispatch = jest.fn();
    await actions.deleteComment('test01')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECEIVE_DELETED_COMMENT',
      comment: { parentId: 'test01', id: 'test01', title: 'test', voteCount: 0 }
    });
    expect(api.deleteComment).toHaveBeenCalledWith('test01');
  });
  it('should create a comment', async () => {
    const dispatch = jest.fn();
    const comment = { parentId: 'test01', id: 'test01', title: 'test', voteCount: 0 };
    await actions.createComment(comment)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECEIVE_NEW_COMMENT',
      comment
    });
    expect(api.createComment).toHaveBeenCalledWith(comment);
  });
  it('should edit a comment', async () => {
    const dispatch = jest.fn();
    const comment = { parentId: 'test01', id: 'test01', title: 'test', voteCount: 0 };
    await actions.editComment(comment)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECEIVE_UPDATED_COMMENT',
      comment
    });
    expect(api.editComment).toHaveBeenCalledWith(comment);
  });
});
