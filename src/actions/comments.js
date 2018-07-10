import * as api from '../utils/api';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT_UP_VOTE = 'RECEIVE_COMMENT_UP_VOTE';
export const RECEIVE_COMMENT_DOWN_VOTE = 'RECEIVE_COMMENT_DOWN_VOTE';
export const RECEIVE_DELETED_COMMENT = 'RECEIVE_DELETE_COMMENT';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';

const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

const receiveCommentUpVote = comment => ({
  type: RECEIVE_COMMENT_UP_VOTE,
  comment
});

const receiveCommentDownVote = comment => ({
  type: RECEIVE_COMMENT_DOWN_VOTE,
  comment
});

const receiveDeletedComment = comment => ({
  type: RECEIVE_DELETED_COMMENT,
  comment
});

const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
});

export const getComments = postId => async dispatch => {
  const comments = await api.getPostComments(postId);
  return dispatch(receiveComments(comments));
};

export const upVoteComment = id => async dispatch => {
  const comment = await api.voteComment(id, 'upVote');
  return dispatch(receiveCommentUpVote(comment));
};

export const downVoteComment = id => async dispatch => {
  const comment = await api.voteComment(id, 'downVote');
  return dispatch(receiveCommentDownVote(comment));
};

export const deleteComment = id => async dispatch => {
  const comment = await api.deleteComment(id);
  return dispatch(receiveDeletedComment(comment));
};

export const createComment = commentForm => async dispatch => {
  const comment = await api.createComment(commentForm);
  return dispatch(receiveComment(comment));
};
