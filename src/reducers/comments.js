import { RECEIVE_COMMENTS } from '../actions/comments';
export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments.length > 0
        ? {
            ...state,
            [action.comments[0].parentId]: action.comments.filter(action => !action.deleted)
          }
        : state;
    default:
      return state;
  }
};
