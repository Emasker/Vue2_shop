import {
    reqGoodsInfo,
    reqAddOrUpdateShopCart
} from '@/api/index';
import {
    getUUID
} from '@/utils/uuid_token';
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
        console.log(result);
        if (result.code == 200) {
            commit("GETGOODINFO", result.data);
        }
    },
    //加入购物车的||修改某一个产品的个数
    async addOrUpdateShopCart({
        commit
    }, {
        skuId,
        skuNum
    }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
            //返回的是成功的标记
            return "ok";
        } else {
            //返回的是失败的标记
            return Promise.reject(new Error("faile"));
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