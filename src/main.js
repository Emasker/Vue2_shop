//引入Vue
import Vue from 'vue';
//引入App
import App from './App.vue';
//引入路由
import router from '@/router';
//引入仓库
import store from '@/store';

//定义全局组件TypeNav
import TypeNav from '@/components/TypeNav/TypeNav'; //三级菜单
import Carousel from '@/components/Carousel/Carousel'; //轮播图
import Pagination from '@/components/Pagination/Pagination'; //分页器
//注册全局组件
Vue.component(TypeNav.name, TypeNav); 
Vue.component(Carousel.name, Carousel); 
Vue.component(Pagination.name, Pagination);

//按需引入element-ui
import {
  Button,
  MessageBox
} from 'element-ui';
Vue.component(Button.name, Button); //按钮
Vue.prototype.$msgbox = MessageBox; //弹出框
Vue.prototype.$alert = MessageBox.alert; //弹出事件

//引入MockServer.js
import "@/mock/mockServe";

//引入轮播图样式
import "swiper/css/swiper.min.css";

//引入api中的所有接口
import * as API from '@/api/index';

//引入表单验证插件
import '@/plugins/validate'

//引入懒加载
import VueLazyload from 'vue-lazyload';
import loadImg from '@/assets/images/20140524124233131.gif'; //引入懒加载图片
//注册懒加载
Vue.use(VueLazyload, {
  loading: loadImg,
})

//关闭Vue的生产提示
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  }
}).$mount('#app')