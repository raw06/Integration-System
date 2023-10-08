const accessToken = 'access_token';

export const getToken = () => {
  return localStorage.getItem(accessToken);
};

export const setToken = (token) => {
  // eslint-disable-next-line no-unused-expressions
  token ? localStorage.setItem(accessToken, token) : localStorage.removeItem(accessToken);
};

export const removeToken = () => {
  localStorage.removeItem(accessToken);
};
