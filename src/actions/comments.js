import * as api from '../utils/api';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT_UP_VOTE = 'RECEIVE_COMMENT_UP_VOTE';
export const RECEIVE_COMMENT_DOWN_VOTE = 'RECEIVE_COMMENT_DOWN_VOTE';
export const RECEIVE_DELETED_COMMENT = 'RECEIVE_DELETE_COMMENT';

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

export const receiveUpVote = comment => ({
  type: RECEIVE_COMMENT_UP_VOTE,
  comment
});

export const receiveDownVote = comment => ({
  type: RECEIVE_COMMENT_DOWN_VOTE,
  comment
});

export const receiveDeletedComment = comment => ({
  type: RECEIVE_DELETED_COMMENT,
  comment
});

export const getComments = postId => async dispatch => {
  const comments = await api.getPostComments(postId);
  return dispatch(receiveComments(comments));
};

export const upVote = id => async dispatch => {
  const comment = await api.voteComment(id, 'upVote');
  return dispatch(receiveUpVote(comment));
};

export const downVote = id => async dispatch => {
  const comment = await api.voteComment(id, 'downVote');
  return dispatch(receiveDownVote(comment));
};

export const deleteComment = id => async dispatch => {
  const comment = await api.deleteComment(id);
  return dispatch(receiveDeletedComment(comment));
};
