export default {
  namespace: 'common',
  state: {
    name: 'wl',
    age: 18,
  },
  effects: {
    *fetch(_, { put }) {
      yield new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
      yield put({
        type: 'updateName',
        name: 'WL',
      });
    },
    *query(_, { put }) {
      yield new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
      yield put({
        type: 'updateAge',
        age: 20,
      });
    },
  },
  reducers: {
    updateName(state, { name }) {
      return {
        ...state,
        name,
      };
    },
    updateAge(state, { age }) {
      return {
        ...state,
        age,
      };
    },
  },
  subscriptions: {
    // step({ dispatch }) {
    // dispatch({
    // type: 'fetch',
    // });
    // dispatch({
    // type: 'query',
    // });
    // },
  },
};