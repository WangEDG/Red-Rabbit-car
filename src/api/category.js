import request from "../utils/request"

// 获取所有服务类别
export const getServicetype = (query) => {
  return request.get("/api/gen/servicetype", {
    params: query
  })
}

// 删除服务类别
export const delServicetype = (id) => {
  return request.delete(`/api/gen/servicetype/${id}`)
}


// 新增类别
export const addServicetype = (data) => {
  return request(`/api/gen/servicetype`, {
    method: 'POST',
    data
  })
}


// 修改类别
export const altServicetype = (data) => {
  debugger
  return request(`/api/gen/servicetype`, {
    method: 'put',
    data
  })
}




// export async function getRemoteList() {
//   return request('/api/users', {
//       method: 'get'
//     })
//     .then(response => {
//       return response
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }
