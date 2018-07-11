import {
  RECEIVE_POSTS,
  RECEIVE_POST_UP_VOTE,
  RECEIVE_POST_DOWN_VOTE,
  RECEIVE_DELETED_POST,
  RECEIVE_NEW_POST,
  RECEIVE_UPDATED_POST
} from '../actions/posts';

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts.filter(post => !post.deleted);
    case RECEIVE_POST_UP_VOTE:
    case RECEIVE_POST_DOWN_VOTE:
    case RECEIVE_UPDATED_POST:
      return state.map(post => (post.id === action.post.id ? action.post : post));
    case RECEIVE_DELETED_POST:
      return state.filter(post => post.id !== action.post.id);
    case RECEIVE_NEW_POST:
      return [...state, action.post];
    default:
      return state;
  }
};
