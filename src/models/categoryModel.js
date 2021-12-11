// 网络请求
import {getServicetype} from "@/api/category"

export default {
    namespace:"category",
    state: {
      categoryData: {},
    },


    reducers: {
      updateCategoryList(state, { payload }) {
        state.categoryData = payload;
      },
    },


    effects: {
      *getCategoryList({ payload }, { call, put }) {
          // console.log("状态机接收的参数：",payload);

          const res = yield call( getServicetype, payload );

          // 修改数据
          if (res) {
            
            yield put({
              type:"updateCategoryList",
              payload:res,
            })
          }
          return res
      },
    },
  };
  