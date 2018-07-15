import { combineReducers } from 'redux';
import categories from './categories';
import posts from './posts';
import comments from './comments';
import user from './user';

export default combineReducers({
  categories,
  posts,
  comments,
  user
});
