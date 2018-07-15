import { RECEIVE_LOGIN, LOGOUT } from '../actions/user';
import { getUser } from '../utils/storage';

function getInitialState() {
  const user = getUser();
  return user ? { isLoggedIn: true, ...user } : { isLoggedIn: false };
}

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case RECEIVE_LOGIN:
      return { isLoggedIn: true, ...action.user };
    case LOGOUT:
      return { isLoggedIn: false };
    default:
      return state;
  }
};
