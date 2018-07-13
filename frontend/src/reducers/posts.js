import {
  RECEIVE_POSTS,
  RECEIVE_POST_UP_VOTE,
  RECEIVE_POST_DOWN_VOTE,
  RECEIVE_DELETED_POST,
  RECEIVE_NEW_POST,
  RECEIVE_UPDATED_POST,
  RECEIVE_SINGLE_POST
} from '../actions/posts';

import { RECEIVE_NEW_COMMENT, RECEIVE_DELETED_COMMENT } from '../actions/comments';

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case RECEIVE_POST_UP_VOTE:
    case RECEIVE_POST_DOWN_VOTE:
    case RECEIVE_UPDATED_POST:
      return state.map(post => (post.id === action.post.id ? action.post : post));
    case RECEIVE_DELETED_POST:
      return state.filter(post => post.id !== action.post.id);
    case RECEIVE_NEW_POST:
      return [...state, action.post];
    case RECEIVE_NEW_COMMENT:
      return state.map(
        post =>
          post.id === action.comment.parentId
            ? { ...post, commentCount: post.commentCount + 1 }
            : post
      );
    case RECEIVE_DELETED_COMMENT:
      return state.map(
        post =>
          post.id === action.comment.parentId
            ? { ...post, commentCount: post.commentCount - 1 }
            : post
      );
    case RECEIVE_SINGLE_POST:
      return action.post.error || Object.keys(action.post).length === 0 ? [] : [action.post];
    default:
      return state;
  }
};
