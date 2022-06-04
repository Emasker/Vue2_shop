import {
    reqCartList,
    reqDeleteCartById,
    reqUpdateCheckedById
} from "@/api/index";

export {
    reqCartList
}
from "@/api/index"
const state = {
    cartList: [],
};
const actions = {
    //获取购物车数据
    async getCartList({
        commit
    }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit("GETCARTLIST", result.data);
        }
    },
    //删除购物车某个商品
    async deleteCartListBySkuId({
        commit
    }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    //修改购物车商品选中状态
    async updateCheckedById({
        commit
    }, {
        skuId,
        isChecked
    }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    //删除全部勾选
    deleteAllCheckedCart({
        dispatch,
        getters
    }) {
        let PromiseAll = [];
        //获取购物车中全部商品
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll);
    },
    //修改全部商品状态
    updateAllCartIsChecked({
        dispatch,
        state
    }, isChecked) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch("updateCheckedById", {
                skuId: item.skuId,
                isChecked,
            });
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    },
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}