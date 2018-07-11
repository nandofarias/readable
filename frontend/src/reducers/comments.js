import {
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT_UP_VOTE,
  RECEIVE_COMMENT_DOWN_VOTE,
  RECEIVE_DELETED_COMMENT,
  RECEIVE_NEW_COMMENT,
  RECEIVE_UPDATED_COMMENT
} from '../actions/comments';
export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments.length > 0
        ? {
            ...state,
            [action.comments[0].parentId]: action.comments.filter(comment => !comment.deleted)
          }
        : state;
    case RECEIVE_COMMENT_UP_VOTE:
    case RECEIVE_COMMENT_DOWN_VOTE:
    case RECEIVE_UPDATED_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: state[action.comment.parentId].map(
          comment => (comment.id === action.comment.id ? action.comment : comment)
        )
      };
    case RECEIVE_DELETED_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: state[action.comment.parentId].filter(
          comment => comment.id !== action.comment.id
        )
      };
    case RECEIVE_NEW_COMMENT:
      const comments = state[action.comment.parentId] || [];
      return {
        ...state,
        [action.comment.parentId]: [...comments, action.comment]
      };
    default:
      return state;
  }
};
