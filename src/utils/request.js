import { extend } from 'umi-request';

const request = extend({
  // 请求头说明：
  // 1、登录headers中必须配置"Content-Type":"application/x-www-form-urlencoded"
  // 2、其他请求搭载token的方式为："Authentication":localStorage.getItem("token")
  // 3、登录请求无需应用当前配置，其他请求路径以 "/api开头"
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
     Authentication: localStorage.getItem('token'),
  },
  
  // 默认处理请求错误
  errorHandler: (err) => {
    console.log('请求失败', err);
  },
});

export default request;
