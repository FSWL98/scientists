import BaseService from "./BaseService";
import {baseURL} from "./baseURL";

export default class AuthService extends BaseService {
  static get isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  static getUserLocal() {
    const userStr = localStorage.getItem('user');
    if (userStr === undefined) {
      return undefined;
    }
    try {
      const res = JSON.parse(userStr);
      return res;
    } catch (e) {
      return undefined;
    }
  }

  static logout() {
    window.location.replace('/');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static getAuthToken() {
    return localStorage.getItem('token');
  }

  static async login (password, email) {
    const options = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.request(
      `${baseURL}/api/v1/auth_token/token/login/`,
      options,
    ).then(response => {
      if (response.error)
        return Promise.reject(response.error);
      localStorage.setItem('token', `${response.token}`);
      localStorage.setItem('user', JSON.stringify({
        id: response.pk,
        name: response.FIO,
        image: `${response.imagepath}`
      }));
      return Promise.resolve();
    });
  }

  static async authRequest (url, options, content = 'application/json') {
    options.headers = {
      Authorization: `Token ${this.getAuthToken()}`,
      'Content-Type': content,
    };
    options.mode = 'cors';
    const response = await fetch(url, options);
    return this.parseResponse(response, true, 'token');
  }

  static async checkAuth () {
    const options = {
      mode: 'cors',
      method: 'GET',
      headers: {
        Authorization: `${this.getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch(
      `${baseURL}/api/v1/auth_token/token/tokenchek/`,
      options,
    );
    return response;
  }
}