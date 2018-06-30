import { RECEIVE_POSTS, RECEIVE_UP_VOTE, RECEIVE_DOWN_VOTE } from '../actions/posts';

function sort(posts) {
  return posts.sort((a, b) => a.timestamp - b.timestamp).sort((a, b) => a.voteScore - b.voteScore);
}

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return sort(action.posts.filter(post => !post.deleted));
    case RECEIVE_UP_VOTE:
      return sort(state.map(post => (post.id === action.post.id ? action.post : post)));
    case RECEIVE_DOWN_VOTE:
      return sort(state.map(post => (post.id === action.post.id ? action.post : post)));
    default:
      return state;
  }
};
