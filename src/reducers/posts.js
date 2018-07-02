import { RECEIVE_POSTS, RECEIVE_UP_VOTE, RECEIVE_DOWN_VOTE } from '../actions/posts';

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts.filter(post => !post.deleted);
    case RECEIVE_UP_VOTE:
      return state.map(post => (post.id === action.post.id ? action.post : post));
    case RECEIVE_DOWN_VOTE:
      return state.map(post => (post.id === action.post.id ? action.post : post));
    default:
      return state;
  }
};
