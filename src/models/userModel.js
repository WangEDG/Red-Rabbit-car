export default {
  // namespace:"user",
  state: {
    userInfo: [],
  },
  reducers: {
    updateUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
  },
  effects: {
    *getUserInfo({ payload }, { call, put }) {},
  },
};
