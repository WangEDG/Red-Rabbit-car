import request from "../utils/request"

// 获取所有充电桩审核数据
export const getCharge = (query) => {
  return request.get("/gen/apply/charge", {
    params: query
  })
}

// 这种写法报错
// export  function getCharge (query = {pageNum:1,pageSize:5}) {
//     debugger
//     return request({
//         url: '/api/gen/apply/charge',
//         method:"get",
//         params:query
//     })
// }

// 获取所有店铺审核数据
export const getAuditData = () => {
  return request.get("/gen/apply", {
    params: {
      pageSize: 100
    }
  })
}





// 获取所有门店信息
export const getFindAll = (query) => {
  return request.get("/gen/shop/findAll", {
    params: query
  });
}
// 获取门店警告信息
export const getwarn = (id) => {
  return request.get("/gen/warn?id=" + id);
}
// 修改门店状态
export const statusChange = (query) => {
  debugger
  return request.put("/gen/shop", query);
}
