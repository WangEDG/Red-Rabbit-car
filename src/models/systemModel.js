// 网络请求
import { getMenu} from "@/api/system"

export default {
    namespace:"system",
    state: {
      menuList: [],//全部菜单列表
    },


    // reducers中写修改state中的方法
    reducers: {
      updateMenuList(state, { payload }) {
        state.menuList = payload;
      },
    },


    // effects中发送异步请求
    effects: {
      *getMenuList({ payload }, { call, put }) {

        // 异步请求必须要在 call 中进行
        // 是因为call要对异步请求回来的数据进行统一的管理
        const res = yield call( getMenu, payload );

        // 获取到接口数据后调用reducers里面的方法修改state中的数据
        if (res) {
          yield put({type:"updateMenuList",payload:res,})
        }

        return res
      },
    },
  };
