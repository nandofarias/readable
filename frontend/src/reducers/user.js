import { RECEIVE_LOGIN, LOGOUT } from '../actions/user';

export default (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    case RECEIVE_LOGIN:
      return { isLoggedIn: true, ...action.user };
    case LOGOUT:
      return { isLoggedIn: false };
    default:
      return state;
  }
};
