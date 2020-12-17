import AuthService from "./AuthService";
import {baseURL} from "./baseURL";

export default class scientistsService extends AuthService {
  static async getScientist (id) {
    const options = {
      method: 'GET',
      mode: 'cors',
    };
    const response = this.authRequest(
      `${baseURL}/api/v1/scientistprofile/${id}/`,
      options,
    );
    return response;
  }

  static async getNews (page, size) {
    const options = {
      method: 'GET',
      mode: 'cors',
    };
    const response = this.request(
      `${baseURL}/api/v1/news/all?page=${page}&size=${size}`,
      options,
    );
    return response;
  }

  static async getNewsCount () {
    const options = {
      method: 'GET',
      mode: 'cors',
    };
    const response = this.request(
      `${baseURL}/api/v1/news/count/`,
      options,
    );
    return response;
  }

  static async patchUser (data, id) {
    const formData = new FormData();
    Object.keys(data).map(el => formData.append(el, data[el]));
    const options = {
      method: 'PATCH',
      mode: 'cors',
      body: formData,
    };
    const response = this.authRequest(
      `${baseURL}/api/v1/scientistprofile/${id}/`,
      options,
      false,
    );
    return response;
  }

  static async createChat(user1_id, user2_id) {
    const options = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        user1_id,
        user2_id
      })
    };
    const response = this.authRequest(
      `${baseURL}/api/v1/createChatRoom/`,
      options
    );
    return response;
  }

  static async getPoints (big = '', region = '', spec = '', title = '', keyword = '') {
    const options = {
      method: 'GET',
      mode: 'cors',
    };
    let query = '';
    if (big) {
      query += `?Bigregion=${big}`;
    }
    if (region) {
      query += `&region=${region}`;
    }
    if (spec) {
      query += `${query === '' ? '?' : '&'}codeSpeciality=${spec}`;
    }
    if (title) {
      query += `${query === '' ? '?' : '&'}academicDegree=${title}`;
    }
    if (keyword) {
      query += `${query === '' ? '?' : '&'}keywords=${keyword.split(' ').join(';')}`;
    }
    const response = this.request(
      `${baseURL}/api/v1/getpoints/${query}`,
      options,
    )
    return await response;
  }
}