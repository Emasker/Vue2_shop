import {
    reqGoodsInfo,
    reqAddOrUpdateShopCart
} from '@/api/index';
import {getUUID} from '@/utils/uuid_token'; 
const state = {
    goodInfo: {},
    //游客临时身份
    uuid_token: getUUID()
};
const actions = {
    async getGoodInfo({
        commit
    }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODINFO", result.data);
        }
    },
    async addOrUpdateShopCart({
        commit
    }, {
        skuId,
        skuNum
    }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("failed"));
        }
    },
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};

const getters = {
    //简化路径导航
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    //简化产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //简化商品属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}