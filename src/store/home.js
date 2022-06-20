import {
  reqGetCategoryList,
  reqGetBannerList,
  reqFloorList
} from "@/api/index";
const state = {
  //home仓库中存储三级菜单的数据
  categoryList: [],
  //轮播图的数据
  bannerList: [],
  //floor组件的数据
  floorList: []
};

const mutations = {
  GETCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList.slice(0, 16);
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  }
};

const actions = {
  //获取三级菜单的数据
  async getCategoryList({
    commit
  }) {
    let result = await reqGetCategoryList();
    if (result.code == 200) {
      commit("GETCATEGORYLIST", result.data);
    }
  },
  //获取首页轮播图的数据
  async getBannerList({
    commit
  }) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit("GETBANNERLIST", result.data);
    }
  },
  //获取floor数据
  async getFloorList({
    commit
  }) {
    let result = await reqFloorList();
    if (result.code == 200) {
      commit("GETFLOORLIST", result.data);
    }
  },
};

const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};