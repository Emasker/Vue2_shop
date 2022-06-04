<template>
  <div class="outer">
    <Header v-show="$route.meta.show"/>
    <HeadSearch/>
    <router-view></router-view>
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import HeadSearch from "@/components/Header/HeadSearch.vue";
import Footer from "@/components/Footer/Footer.vue";
export default {
  name: "App",
  components: { Header, HeadSearch, Footer },
  mounted() {
    //派发action|获取三级列表的数据
    this.$store.dispatch("getCategoryList");
  },
};
</script>