import * as api from '../utils/api';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const UP_VOTE = 'UP_VOTE';
export const DOWN_VOTE = 'DOWN_VOTE';

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const getCategoryPosts = category => async dispatch => {
  const posts = await api.getCategoriesPosts(category);
  return dispatch(receivePosts(posts));
};

export const getAllPosts = () => async dispatch => {
  const posts = await api.getPosts();
  return dispatch(receivePosts(posts));
};
