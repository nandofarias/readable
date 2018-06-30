import { RECEIVE_COMMENTS } from '../actions/comments';
export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      console.log(action.comments);
      return action.comments.length > 0
        ? { ...state, [action.comments[0].parentId]: action.comments }
        : state;
    default:
      return state;
  }
};
