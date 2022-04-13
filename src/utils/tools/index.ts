import Taro from '@tarojs/taro';

/**
 * 延迟返回
 * @param delayTime 延迟时间（毫秒）
 * @param res 返回内容
 * @returns
 */
export function delay(delayTime = 25, res) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res);
    }, delayTime);
  });
}


/**
 * 创建一个从 obj 中选中的属性的对象。
 * @param {*} obj 源obj
 * @param {*} keyList 要提取的key
 * @returns 新obj
 */
export const pickObj = (obj = {}, keyList = []) =>
  keyList.reduce((pv, cv) => ({ ...pv, [cv]: obj?.[cv] }), {});

/**
* 将arry转为对象，key为对象的键，item为值
* @param {*} arry
* @param {*} key 主键
* @returns
*/
export const arry2Map = (arry = [], key) => {
  if (!Array.isArray(arry)) return {};
  return arry.reduce((pv, cv) => {
    return {
      ...pv,
      [cv[key]]: cv,
    };
  }, {});
};

/**
 * rpx 转 px, 四舍五入
 * @param {*} rpx
 */
export const rpx2px = (() => {
  //  if (systemInfo) {
  //   // systemInfo
  //  }
  const { windowWidth } = Taro.getSystemInfoSync();
  return (rpx = 0, option) => {
    const num = option?.num || 0; // 保留小数
    const type = option?.type || 'round'; // 方法
    return Math[type]((rpx / 750) * windowWidth * 10 ** num) / 10 ** num;
  };
})();


/**
 * 对象拼接为url参数格式
 * @param {*} obj
 */
export const obj2UrlParams = (obj = {}) => {
  if (!obj) return '';
  return Object.keys(obj)
    .reduce((pv, cv) => [...pv, `${cv}=${obj[cv] || ''}`], [])
    .join('&');
};

/**
 * formatTime 时间格式化
 */
export const formatTime = (date, format = 'yyyy-MM-dd hh:mm:ss') => {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(Number(date));
  }
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    throw Error('时间格式错误' + date);
  }
  const o = {
    'M+': date.getMonth() + 1, //month
    'd+': date.getDate(), //day
    'h+': date.getHours(), //hour
    'm+': date.getMinutes(), //minute
    's+': date.getSeconds(), //second
    'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
    'N+': date.getHours() < 12 ? 'am' : 'pm', //ampm
    S: date.getMilliseconds(), //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }
  return format;
};

/**
 * 生成uuid
 * @returns {string}
 */
export const uuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });


/**
* 将对象里的key重命名或删除
* @param {*} params 对象
* @param {*} renameObj { '现有key': '重命名key' }
*/
export const reNameObjKey = (params = {}, renameObj) => {
  if (!renameObj) {
    return params;
  }
  try {
    const _rKey = Object.keys(renameObj);
    return Object.keys(params).reduce((pv, cv) => {
      let newPv = { ...pv };
      if (_rKey.includes(cv)) {
        if (renameObj[cv]) {
          // 存在则重命名，不存在则不填入
          newPv[renameObj[cv]] = params[cv];
        }
      } else {
        newPv[cv] = params[cv];
      }
      return newPv;
    }, {});
  } catch (e) {
    console.log(e);
  }
  return params;
};

// 小程序无sessionStorage，用全局数据代替, ** value用字符串格式 **
export const sessionStorageSync =
  process.env.TARO_ENV === 'h5'
    ? window.sessionStorage
    : {
      data: {},
      setItem(key, value) {
        if (!key) return null;
        sessionStorageSync.data[key] = value;
        return true;
      },
      getItem(key) {
        if (!key) return null;
        return sessionStorageSync.data[key] || null;
      },
      removeItem(key) {
        if (!key) return null;
        delete sessionStorageSync.data[key];
        return true;
      },
      clear() {
        sessionStorageSync.data = {};
      },
    };
