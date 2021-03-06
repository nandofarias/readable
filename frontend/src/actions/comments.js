import * as api from '../utils/api';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT_UP_VOTE = 'RECEIVE_COMMENT_UP_VOTE';
export const RECEIVE_COMMENT_DOWN_VOTE = 'RECEIVE_COMMENT_DOWN_VOTE';
export const RECEIVE_DELETED_COMMENT = 'RECEIVE_DELETED_COMMENT';
export const RECEIVE_NEW_COMMENT = 'RECEIVE_NEW_COMMENT';
export const RECEIVE_UPDATED_COMMENT = 'RECEIVE_UPDATED_COMMENT';

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

const receiveNewComment = comment => ({
  type: RECEIVE_NEW_COMMENT,
  comment
});

const receiveUpdatedComment = comment => ({
  type: RECEIVE_UPDATED_COMMENT,
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
  return dispatch(receiveNewComment(comment));
};

export const editComment = commentForm => async dispatch => {
  const comment = await api.editComment(commentForm);
  return dispatch(receiveUpdatedComment(comment));
};
