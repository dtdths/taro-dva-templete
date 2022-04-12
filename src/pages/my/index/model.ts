import { delay } from "@/utils/tools";

export default {
  namespace: 'myIndex', // 这是模块名
  state: {
    indexData: 0,
  },
  effects: {
    /**
     * @description 获取列表数据
     * @param {*} { payload = {} }
     * @param {*} { call, put, select }
     */
    getIndexData: [
      function* ({ payload }, { call, put, select }) {

        try {
          const indexData = yield select((state) => state.myIndex.indexData);
          const res = yield call(delay, 1000, payload?.num + indexData);

          yield put({
            type: 'save',
            payload: {
              indexData: res,
            },
          });
          return res;
        } catch (error) {
          return 0;
        }
      },
      {
        type: 'takeLatest',
      },
    ],
  },

  reducers: { // 同步方法
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
