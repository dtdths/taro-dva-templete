import mergeWith from 'lodash/mergeWith';
import debounce from 'lodash/debounce';
import {
  // BASE_URL,
  API_MAP
 } from '@/config/api';
import { PROCESS_TARO_ENV } from '@/config/enum';
import Taro from '@tarojs/taro';
import Network from './network';
import networkRequest from './networkRequest';


// TODO 引入小程序登录组件
// const loginPlugin = envType === Taro.ENV_TYPE.WEAPP ? Taro.requirePlugin('loginPlugin') : null;

// 业务接口code码对应的错误信息
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  // 400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  // 403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  // 500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  // 503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  400: '请求参数格式不正确',
  // 401: "需要登录",
  403: '没有权限',
  500: '服务器异常',
  // 501: '需要登录',
  503: '服务器限流',
  777: '未登录',
};

/**
 * 防止短时间内重复跳转
 * 第一时间跳转，后续500MS以内的跳转忽略
 */
const redirectToLogin = debounce(
  (url) => {
    // TODO: 跳转登录
    console.log(url)
    // goLogin({
    //   redirectURL: url,
    //   loginToURLredirectType: 'redirectTo',
    //   toLoginRedirectType: 'redirectTo',
    // });
  },
  500,
  {
    leading: true,
    trailing: false,
  },
);

// 请求默认配置
const defaultConfig = {
  url: '', // 请求地址
  data: {}, // 请求参数
  timeout: 5000, // 超时时间
  method: 'GET', // 请求方式
  header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  dataType: 'json', // 返回的数据类型
  withCredentials: true, // 是否携带身份信息
  // checkLogin: false, // 注意：该配置项用于请求前验证用户登录态，若用户未登录将自动进行登录操作，用户登录成功后再发送接口请求
  autoLogin: false, // 是否根据接口返回数据的code进行，对401状态码情况进行登录页跳转
  autoShowError: true, // 是否自动根据接口返回数据的code进行判断并提示错误信息
  // isColor: true, // 是否是color接口
  // 对返回的data字段进行托底
  // dataUnderlay: {
  //   result: {}
  // },
  validateResponse: function (response, apiConf) {
    const { code, result } = response || {};
    return code === 200;
  },
};

// 创建请求对象
const requestInstance = new Network(defaultConfig, networkRequest);
// 添加默认请求拦截器
requestInstance.interceptors.request.use(...createDefaultRequestInterceptor());
// 添加默认响应拦截器
requestInstance.interceptors.response.use(...createDefaultResponseInterceptor());

/**
 * 请求API配置中的接口
 * @param {String} apiKey api标识
 * @param {Object} apiUserConfig  用户自定义配置
 * @returns Promise
 */
export default function requestAPI(apiKey, apiUserConfig) {
  if (!API_MAP.hasOwnProperty(apiKey)) {
    return Promise.reject(new Error('未找到指定 api 配置'));
  }
  const _requestConfig = mergeWith({}, API_MAP[apiKey], apiUserConfig);
  // console.log(`request-- ${apiKey}`, _requestConfig?.data?.body || {});
  return requestInstance.request(_requestConfig);
}

// 创建默认请求拦截器
// 对需要验证登录的接口，进行登录态验证过，未登录时进行跳转登录页的操作
function createDefaultRequestInterceptor() {
  let _onRejected, _onFulfilled;
  _onFulfilled = function (requestConfig) {
    if (requestConfig.withCredentials) {
      switch (process.env.TARO_ENV) {
        case PROCESS_TARO_ENV.H5:
          // h5 跨域携带cookie，需配置
          requestConfig.mode = 'cors';
          requestConfig.credentials = 'include';
          break;
        case PROCESS_TARO_ENV.WEAPP:
          // weapp环境添加cookie
          requestConfig.header = requestConfig.header || {};
          const { cookie } = requestConfig.header;
          // TODO: 手动添加cookie
          const _cookie = '';
          requestConfig.header.cookie = cookie ? `${cookie};${_cookie}` : _cookie;
          // 若当前未登录，且接口配置了自动跳转登录
          // TODO: 如果cookie里没有某项，可以直接判断为未登录
          const ptKey = '';
          if (!ptKey && requestConfig.autoLogin) {
            redirectToLogin(requestConfig?.loginReturnUrl);
            return Promise.reject(new Error('用户未登录'));
          }
          break;
        default:
          break;
      }
    }

    // TODO: 其他处理
    if (requestConfig.method === 'POST') {
      requestConfig.header['Content-Type'] = 'application/x-www-form-urlencoded';
      if (requestConfig?.data?.body) {
        requestConfig.data.body = JSON.stringify(requestConfig.data.body);
      }
    }

    return requestConfig;
  };
  return [_onFulfilled, _onRejected];
}

// 创建默认响应拦截器
// 验证响应是否正确
function createDefaultResponseInterceptor() {
  let _handler = (args) => {
      const { response = {}, apiConfig: apiConf } = args;
      console.log(11111,apiConf)
      try {
        // 获取验证响应结果的方法
        const { data = {} } = response || {};

        // 验证响应结果
        const validateResult = apiConf.validateResponse(data, apiConf);
        if (validateResult) {
          return Promise.resolve(data);
        }

        // 以下为 validateResult 为 false 时的处理逻辑
        let { msg, code } = data;

        // 自动显示提示
        if (apiConf.autoShowError) {
          console.log(9999,apiConf)
          const tempMessage = msg || codeMessage[code] || '服务忙，请稍后再试';
          if (tempMessage) {
            Taro.showToast({
              title: tempMessage,
              icon: 'none',
              duration: 2000,
            });
          }
        }

        // 如果标识需要自动登录，则跳转到登录页
        // TODO: 特殊状态码处理
        if (apiConf.autoLogin && ['777', 401].includes(code)) {
          // TODO： 小程序环境可能存在ptKey存在但过期，此时先退出登录
          const testHasPtKey = false;
          if (process.env.TARO_ENV === PROCESS_TARO_ENV.WEAPP && testHasPtKey) {
            // return new Promise((_, reject) => {
            //   loginPlugin.logout({
            //     callback() {
            //       redirectToLogin(apiConf?.loginReturnUrl);
            //       reject({
            //         ...args,
            //       });
            //     },
            //   });
            // });
          } else {
            redirectToLogin(apiConf?.loginReturnUrl);
          }
        }

        return Promise.reject({
          ...args,
        });
      } catch (ex) {
        return Promise.reject({ error: ex, ...args });
      }
    },
    _onRejected = _handler,
    _onFulfilled = _handler;
  return [_onFulfilled, _onRejected];
}
