export const BASE_URL = {
  TEST1: 'https://test.com'
}

export const API_MAP = {
  'getIndexData': {
    url: `${BASE_URL.TEST1}/getIndexData`,
    method: 'GET',
    autoLogin: false,
    autoShowError: true,
    // validateResponse(response) {
    //   return response;
    // },
  },
}
