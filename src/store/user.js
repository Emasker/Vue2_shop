//登陆与注册通用模块
import {
    reqGetCode,
    reqUserRegister,
    reqUserLogin,
    reqUserInfo,
    reqLogout
} from '@/api/index';
import {
    setToken,
    getToken,
    removeToken
} from '@/utils/token'
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
};
const actions = {
    //获取验证码
    async getCode({
        commit
    }, phone) {
        let result = await reqGetCode(phone);
        // console.log(result);
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //用户注册
    async userRegister({
        commit
    }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }

    },
    //登录业务
    async userLogin({
        commit
    }, data) {
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            //本地存储token
            setToken(result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    //获取用户信息
    async getUserInfo({
        commit
    }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("GETUSERINFO", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    //退出登录
    async userLogout({
        commit
    }) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit("CLEAR");
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    }
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state) {
        state.token = '';
        state.userInfo = {};
        removeToken();
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}