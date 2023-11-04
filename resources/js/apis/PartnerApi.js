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

  static async detail(clientId) {
    const token = getToken();
    const response = await instanceAxios.get(`api/client/detail/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async update(clientId, data) {
    const token = getToken();
    const response = await instanceAxios.post(`api/client/update/${clientId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async updateStatus(clientId, status) {
    const token = getToken();
    const response = await instanceAxios.put(`api/client/updateStatus/${clientId}`, status, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async getForAdmin(page, search = '', option = 'all') {
    const token = getToken();
    const response = await instanceAxios.get(
      'api/client/forAdmin',
      {
        params: {
          page,
          search,
          status: option,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  static async updateForAdmin(clientId, status) {
    const token = getToken();
    const response = await instanceAxios.put(`api/client/updateForAdmin/${clientId}`, status, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}

export default PartnerApi;
