const USER_KEY = 'user';
export const saveUser = user => {
  return localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const item = localStorage.getItem(USER_KEY);
  return item ? JSON.parse(item) : null;
};

export const clearUser = () => {
  return localStorage.removeItem(USER_KEY);
};
