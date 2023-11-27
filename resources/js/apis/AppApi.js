import { getToken } from '../utils/auth';
import instanceAxios from './base';

class AppApi {
  static async getAllApp() {
    const token = getToken();
    const response = await instanceAxios.get('api/apps', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}
export default AppApi;
