import * as api from '../utils/api';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST_UP_VOTE = 'RECEIVE_POST_UP_VOTE';
export const RECEIVE_POST_DOWN_VOTE = 'RECEIVE_POST_DOWN_VOTE';
export const RECEIVE_DELETED_POST = 'RECEIVE_DELETE_POST';
export const RECEIVE_NEW_POST = 'RECEIVE_NEW_POST';
export const RECEIVE_UPDATED_POST = 'RECEIVE_UPDATED_POST';

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

const receivePostUpVote = post => ({
  type: RECEIVE_POST_UP_VOTE,
  post
});

const receivePostDownVote = post => ({
  type: RECEIVE_POST_DOWN_VOTE,
  post
});

const receiveDeletedPost = post => ({
  type: RECEIVE_DELETED_POST,
  post
});

const receiveNewPost = post => ({
  type: RECEIVE_NEW_POST,
  post
});

const receiveUpdatedPost = post => ({
  type: RECEIVE_UPDATED_POST,
  post
});

export const getCategoryPosts = category => async dispatch => {
  const posts = await api.getCategoriesPosts(category);
  return dispatch(receivePosts(posts));
};

export const getAllPosts = () => async dispatch => {
  const posts = await api.getPosts();
  return dispatch(receivePosts(posts));
};

export const getSinglePost = postId => async dispatch => {
  const post = await api.getSinglePost(postId);
  return post.error ? dispatch(receivePosts([])) : dispatch(receivePosts([post]));
};

export const upVotePost = id => async dispatch => {
  const post = await api.votePost(id, 'upVote');
  return dispatch(receivePostUpVote(post));
};

export const downVotePost = id => async dispatch => {
  const post = await api.votePost(id, 'downVote');
  return dispatch(receivePostDownVote(post));
};

export const deletePost = id => async dispatch => {
  const post = await api.deletePost(id);
  return dispatch(receiveDeletedPost(post));
};

export const createPost = postForm => async dispatch => {
  const post = await api.createPost(postForm);
  return dispatch(receiveNewPost(post));
};

export const editPost = postForm => async dispatch => {
  const post = await api.editPost(postForm);
  return dispatch(receiveUpdatedPost(post));
};
