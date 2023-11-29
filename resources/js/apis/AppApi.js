import { getToken } from '../utils/auth';
import instanceAxios from './base';

class AppApi {
  static async getAllApp(collectionId = 0) {
    const token = getToken();
    const response = await instanceAxios.get('api/apps', {
      params: { collectionId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async detailApp(id) {
    const token = getToken();
    const response = await instanceAxios.get('api/apps/detail', {
      params: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}
export default AppApi;
