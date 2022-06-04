//对于axios进行二次封装
import axios from "axios";
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";
let requests = axios.create({
  //基础路径
  baseURL: "/mock",
  //请求不能超过5S
  timeout: 5000,
});
//请求拦截器
requests.interceptors.request.use((config) => {
  nprogress.start();
  return config;
});

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    nprogress.done();
    return res.data;
  },
  () => {
    alert("服务器响应数据失败");
  }
);
export default requests;