//对axios进行二次封装
import axios from 'axios';
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";
import store from '@/store'
//创建axios对象
const requests = axios.create({
    //发送请求时路径回自带/api
    baseURL: "/api",
    //请求时间超过5s未响应自动中断请求
    timeout: 5000,
});
//请求拦截器
requests.interceptors.request.use((config) => {
    //游客登录的访问头
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //携带token给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token;
    }
    nprogress.start();
    return config;
});
//响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done();
    return res.data;
}), () => {

    return Promise.reject(new Error('failed'));
};
//暴露
export default requests;