<template>
  <div class="top">
    <div class="container">
      <div class="loginList">
        <p><router-link to="/home">京东</router-link>欢迎您！</p>
        <!-- 未登陆时 -->
        <p v-if="!userName">
          <span>请</span>
          <router-link to="/login">登录</router-link>
          <router-link to="/register" class="register">免费注册</router-link>
        </p>
        <!-- 登录后 -->
        <p v-else>
          <a href="javascript:;">{{ userName }}</a>
          <a href="javascript:;" class="register" @click="logout">退出登录</a>
        </p>
      </div>
      <div class="typeList">
        <router-link to="/center">我的订单</router-link>
        <router-link to="/shopcart">我的购物车</router-link>
        <a href="###">我的京东</a>
        <a href="###">京东会员</a>
        <a href="###">企业采购</a>
        <a href="###">关注京东</a>
        <a href="###">合作招商</a>
        <a href="###">商家后台</a>
      </div>
    </div>
  </div>
</template>
      
<script>
export default {
  name: "Header",
  computed: {
    //用户名信息
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
  methods: {
    //退出登录
    async logout() {
      try {
        await this.$store.dispatch("userLogout");
        this.$router.push('/home');
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>
      
<style lang="less" scope>
.top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;

  .container {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .loginList {
      float: left;

      p {
        float: left;
        margin-right: 10px;
        .register {
          border-left: 1px solid #b3aeae;
          padding: 0 5px;
          margin-left: 5px;
        }
      }
    }

    .typeList {
      float: right;

      a {
        padding: 0 10px;

        & + a {
          border-left: 1px solid #b3aeae;
        }
      }
    }
  }
}
</style>