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
}