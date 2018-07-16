import * as actions from '../../actions/posts';
import * as api from '../../utils/api';
jest.mock('../../utils/api');

describe('/actions/posts', () => {
  it('should get posts by category', async () => {
    const dispatch = jest.fn();
    await actions.getCategoryPosts('test01')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECEIVE_POSTS',
      posts: [
        { id: 'test01', title: 'test', body: 'test', voteCount: 0 },
        { id: 'test02', title: 'test', body: 'test', voteCount: 0 }
      ]
    });
    expect(api.getCategoriesPosts).toHaveBeenCalledWith('test01');
  });
  it('should get all posts', async () => {
    const dispatch = jest.fn();
    await actions.getAllPosts()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECEIVE_POSTS',
      posts: [
        { id: 'test01', title: 'test', body: 'test', voteCount: 0 },
        { id: 'test02', title: 'test', body: 'test', voteCount: 0 }
      ]
    });
  });
  it('should get a single post', async () => {
    const dispatch = jest.fn();
    await actions.getSinglePost('test01')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECEIVE_SINGLE_POST',
      post: { id: 'test01', title: 'test', body: 'test', voteCount: 0 }
    });
    expect(api.getSinglePost).toHaveBeenCalledWith('test01');
  });
  it('should up vote a post', async () => {
    const dispatch = jest.fn();
    api.votePost.mockClear();
    await actions.upVotePost('test01')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECEIVE_POST_UP_VOTE',
      post: { id: 'test01', title: 'test', body: 'test', voteCount: 0 }
    });
    expect(api.votePost).toHaveBeenCalledWith('test01', 'upVote');
  });
  it('should down vote a post', async () => {
    const dispatch = jest.fn();
    api.votePost.mockClear();
    await actions.downVotePost('test01')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECEIVE_POST_DOWN_VOTE',
      post: { id: 'test01', title: 'test', body: 'test', voteCount: 0 }
    });
    expect(api.votePost).toHaveBeenCalledWith('test01', 'downVote');
  });
  it('should delete a post', async () => {
    const dispatch = jest.fn();
    await actions.deletePost('test01')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECEIVE_DELETED_POST',
      post: { id: 'test01', title: 'test', body: 'test', voteCount: 0 }
    });
    expect(api.deletePost).toHaveBeenCalledWith('test01');
  });
  it('should create a post', async () => {
    const dispatch = jest.fn();
    const post = { id: 'test01', title: 'test', body: 'test', voteCount: 0 };
    await actions.createPost(post)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'RECEIVE_NEW_POST', post });
    expect(api.createPost).toHaveBeenCalledWith(post);
  });
  it('shoult edit a post', async () => {
    const dispatch = jest.fn();
    const post = { id: 'test01', title: 'test', body: 'test', voteCount: 0 };
    await actions.editPost(post)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'RECEIVE_UPDATED_POST', post });
    expect(api.editPost).toHaveBeenCalledWith(post);
  });
});
