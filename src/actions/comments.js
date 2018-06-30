import * as api from '../utils/api';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

export const getComments = postId => async dispatch => {
  const comments = await api.getPostComments(postId);
  return dispatch(receiveComments(comments));
};
