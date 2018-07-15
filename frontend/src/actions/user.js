import * as api from '../utils/api';
import { saveUser, clearUser } from '../utils/storage';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const LOGOUT = 'LOGOUT';

const receiveLogin = user => ({
  type: RECEIVE_LOGIN,
  user
});

export const login = userForm => async dispatch => {
  const user = await api.login(userForm);
  saveUser(user);
  return dispatch(receiveLogin(user));
};

export const logout = () => dispatch => {
  clearUser();
  return dispatch({ type: LOGOUT });
};
