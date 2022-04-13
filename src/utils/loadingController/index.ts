import Taro from '@tarojs/taro';

class LoadingController {
  static list = [];
  options = {
    showLoading: Taro.showLoading,
    hideLoading: Taro.hideLoading,
  };
  constructor(options = {}) {
    this.options = {
      ...this.options,
      instanceId: Date.now(), // 该实例的id
      ...options,
    };
  }

  /**
   * 添加
   * @param {*} options
   * @returns
   */
  show(options) {
    const id = options.id || Date.now();
    LoadingController.list.push({
      instanceId: this.options.instanceId,
      id,
      options,
    });
    this.options.showLoading(options);
    return id;
  }

  hide(cb) {
    const newList = LoadingController.list.filter(cb);
    if (!newList.length) {
      this.options.hideLoading();
    } else {
      this.options.showLoading(newList[newList.length - 1].options);
    }
    LoadingController.list = newList;
  }

  /**
   * 根据id删除、或[id]批量删除
   * @param {*} ids
   */
  hideById(ids) {
    this.hide((item) => (Array.isArray(ids) ? !ids.includes(item.id) : item.id !== ids));
  }

  /**
   * 本实例全部删除
   */
  hideByInstanceId(instanceId) {
    this.hide((item) => item.instanceId !== (instanceId || this.options.instanceId));
  }

  /**
   * 全部删除
   */
  clearAll() {
    this.hide((item) => !item);
  }
}

export default LoadingController;
