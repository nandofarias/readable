import * as api from '../utils/api';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_UP_VOTE = 'RECEIVE_UP_VOTE';
export const RECEIVE_DOWN_VOTE = 'RECEIVE_DOWN_VOTE';

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const receiveUpVote = post => ({
  type: RECEIVE_UP_VOTE,
  post
});

export const receiveDownVote = post => ({
  type: RECEIVE_DOWN_VOTE,
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

export const upVote = id => async dispatch => {
  const post = await api.vote(id, 'upVote');
  return dispatch(receiveUpVote(post));
};

export const downVote = id => async dispatch => {
  const post = await api.vote(id, 'downVote');
  return dispatch(receiveDownVote(post));
};
