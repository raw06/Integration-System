/* eslint-disable no-undef */
import axios from 'axios';
import { getToken, setToken } from '../utils/auth';

const instanceAxios = axios.create({
  baseURL: process.env.MIX_APP_URL,
  timeout: 300000,
  cache: 'no-cache',
  headers: {
    accept: 'application/json',
  },
});

instanceAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instanceAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const token = getToken();
    const originConfig = err?.config;
    if (originConfig.url !== '/api/auth/login' && err.response) {
      if (err?.response?.status === 401 && !originConfig?.sent) {
        originConfig.sent = true;
        try {
          const res = await instanceAxios.get('/api/auth/refresh', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const accessToken = res.data?.token?.access_token;
          setToken(accessToken);

          return instanceAxios(originConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
  },
);

export default instanceAxios;
