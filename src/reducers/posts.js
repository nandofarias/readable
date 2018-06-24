import { RECEIVE_POSTS, UP_VOTE, DOWN_VOTE } from '../actions/posts';
export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts
        .filter(post => !post.deleted)
        .sort(post => post.voteScore && post.timestamp)
        .reverse();
    case UP_VOTE:
      return state;
    case DOWN_VOTE:
      return state;
    default:
      return state;
  }
};
