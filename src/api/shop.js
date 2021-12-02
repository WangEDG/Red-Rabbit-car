import request from "../utils/request"

// 获取所有充电桩审核数据
export const getChargeData =(data)=>{
    return request.get("/api/gen/apply/charge",{params:{pageNum:1,pageSize:5}})
}

// 获取所有店铺审核数据
export const getAuditData =()=>{
    return request.get("/api/gen/apply",{params:{pageSize:100}})
}

// 获取所有门店信息
export const getFindAll =()=>{
    return request.get("/api/gen/shop/findAll")
}