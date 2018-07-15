const USER_KEY = 'user';
export const saveUser = user => {
  return localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  return localStorage.getItem(USER_KEY);
};

export const clearUser = () => {
  return localStorage.removeItem(USER_KEY);
};
