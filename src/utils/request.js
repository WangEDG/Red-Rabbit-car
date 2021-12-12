import {
  extend
} from 'umi-request';
import {notification} from 'antd';
import {history} from 'umi';

const request = extend({
  // 请求头说明：
  // 1、登录headers中必须配置"Content-Type":"application/x-www-form-urlencoded"
  // 2、其他请求搭载token的方式为："Authentication":localStorage.getItem("token")
  // 3、登录请求无需应用当前配置，其他请求路径以 "/api开头"

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authentication: localStorage.getItem('token'),
  },


  // // 默认处理请求错误
  // errorHandler: (err) => {
  //   debugger
  //   console.log('请求失败：', err);
  // },

  errorHandler:errorHandler,

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


const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};


/** 异常处理程序 */
const errorHandler = (error) => {
  debugger
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

// request响应拦截器, 统一处理错误信息
request.interceptors.response.use(async (response, options) => {

  // const data = await response.clone().json();
  
  if (response.status !== 200) {
    switch (response.status) {
      case 401:
        notification.warn({
          message: '登录超时，请重新登陆!',
        });
        history.push('/login');
        break;
    }
  }

  return response;

});



export default request;
