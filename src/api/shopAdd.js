import request from "../utils/request"

// 手机号重复验证
export const tel =()=>{
    return request.get("/api/gen/apply/shop/tel/${tel}")
}

// 新增店铺或充电桩
export const shopAdd =(data)=>{
    debugger
    return request.post("/api/gen/apply/shop",data)
}