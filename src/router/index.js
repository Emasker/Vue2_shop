//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store/index'
//使用插件
Vue.use(VueRouter);
//浅拷贝VueRouter的原始push
const origionPush = VueRouter.prototype.push;
const origionReplace = VueRouter.prototype.replace;
//重写push|replace,防止重复点击报错
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        origionPush.call(this, location, resolve, reject);
    } else {
        origionPush.call(this, location, () => {}, () => {});
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        origionReplace.call(this, location, resolve, reject);
    } else {
        origionReplace.call(this, location, () => {}, () => {});
    }
}
//配置路由
let router = new VueRouter({
    routes,
    scrollBehavior() {
        return {
            y: 0
        }
    }
})
//全局守卫，前置守卫
router.beforeEach(async (to, from, next) => {
    let token  = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //用户登录了
    if(token){
      //已经登录不能跳转登录和注册
      if(to.path=="/login"||to.path=='/register'){
         next('/');
      }else{ //登录了且拥有用户信息
        if(name){
          next();
        }else{//登陆了且没有用户信息
          try { //在路由跳转之前获取用户信息且放行
           await store.dispatch('getUserInfo');
           next();
          } catch (error) { //token失效从新登录
            await store.dispatch('userLogout');
            next('/login')
          }
        }
      }
    }else{
       //未登录不能去交易支付购物车等相关页面
       let toPath = to.path;
       if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1|| toPath.indexOf('/shopcart')!=-1){
         next('/login?redirect='+toPath);
       }else{
          next();
       }
     
    }
 });
//全局后置路由守卫
router.afterEach((to)=>{
	document.title = to.meta.title || 'Vue2_shop'
})


export default router;