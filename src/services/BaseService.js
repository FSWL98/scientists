export default class BaseService {
  // парсер ответа от сервера
  static async parseResponse(response, checkUnauthorized, tokenName) {
    const { status } = response;

    if (status < 200 || status >= 300) {
      if (checkUnauthorized && status === 401) {
        localStorage.removeItem(tokenName);
        window.location.reload();
      } else {
        return { error: status };
      }
    }
    if (status === 204) {
      return {};
    }

    const parsedResponse = await response.json();
    return parsedResponse;
  }

  static async parseResponseWithStatus(response, checkUnauthorized, tokenName) {
    const { status } = response;

    if (status < 200 || status >= 300) {
      if (checkUnauthorized && status === 401) {
        localStorage.removeItem(tokenName);
        window.location.reload();
      }
      return { error: status };
    }

    const parsedResponse = await response.json();
    parsedResponse.status = status;
    return parsedResponse;
  }

  // запрос к серверу
  static async request(url, options) {
    return fetch(url, options).then(response =>
      this.parseResponse(response, false),
    );
  }
}