// 网络请求
import { getMenu} from "@/api/system"

export default {
    namespace:"system",
    state: {
      menuList: [],//全部菜单列表
    },


    reducers: {
      updateMenuList(state, { payload }) {
        state.menuList = payload;
      },
    },


    effects: {
      *getMenuList({ payload }, { call, put }) {
        const res = yield call( getMenu, payload );
        // 修改数据
        if (res) {
          yield put({type:"updateCategoryList",payload:res,})
        }
        return res
      },
    },
  };
