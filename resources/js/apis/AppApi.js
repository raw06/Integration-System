import { getToken } from '../utils/auth';
import instanceAxios from './base';

class AppApi {
  static async getAllApp(id = 0) {
    const token = getToken();
    const response = await instanceAxios.get('api/apps', {
      params: { collectionId: id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}
export default AppApi;
