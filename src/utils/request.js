import {
  extend
} from 'umi-request';
import {
  notification
} from 'antd';
import {
  history
} from 'umi';

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


// request请求拦截器, 改变url 或 options
request.interceptors.request.use((url, options) => {

  return {
    url: "/api" + url,
    options: {
      ...options,
      interceptors: true
    },
  }

});


// request响应拦截器, 统一处理错误信息
request.interceptors.response.use(async (response, options) => {
  
  const data = await response.clone().json();

  switch (data.code) {
    case 401:
      notification.warn({
        message: '登录超时，请重新登陆!',
      });
      history.push('/login');
      break;
  }

  return response;

});



export default request;
