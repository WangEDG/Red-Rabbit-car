import request from "../utils/request"

/***
*菜单管理
*/

//获取菜单数据
export const getMenu = (query)=>{
  debugger
  return request.get("/menu",{params:query})
}
// 新增店铺或充电桩
export const shopAdd =(data)=>{
    debugger
    return request.post("/gen/apply/shop",data)
}
