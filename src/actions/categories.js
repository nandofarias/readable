import * as api from '../utils/api';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const getCategories = () => async dispatch => {
  const response = await api.getCategories();
  return dispatch(receiveCategories(response.categories));
};
