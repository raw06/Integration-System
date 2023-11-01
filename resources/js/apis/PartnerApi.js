import { getToken } from '../utils/auth';
import instanceAxios from './base';

class PartnerApi {
  static async create(data) {
    const token = getToken();
    const response = await instanceAxios.post('api/client/create', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async get(page, search = '', option = ['all']) {
    const token = getToken();
    const response = await instanceAxios.get('api/client/get', {
      params: {
        page,
        search,
        status: option,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}

export default PartnerApi;
