import { getToken } from '../utils/auth';
import instanceAxios from './base';

class AuthApi {
  static async getUser() {
    const token = getToken();
    const response = await instanceAxios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async login(data) {
    const token = getToken();
    const response = await instanceAxios.post('api/auth/login', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async register(data) {
    const response = await instanceAxios.post('api/auth/register', data);
    return response.data;
  }

  static async logout() {
    const token = getToken();
    const response = await instanceAxios.get('api/auth/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}
export default AuthApi;
