<template>
  <div class="bottom">
    <h1 class="logoArea">
      <router-link to="/home" class="logo">
        <img src="./images/logo.jpg" alt="" />
      </router-link>
    </h1>
    <div class="searchArea">
      <form action="###" class="searchForm">
        <input
          type="text"
          placeholder="华为"
          id="autocomplete"
          class="input-error input-xxlarge"
          v-model="keyword"
        />
        <button
          class="sui-btn btn-xlarge btn-danger"
          type="button"
          @click="goSearch"
        >
          搜索
        </button>
      </form>
    </div>
    <h1 class="rightArea" v-show="$route.meta.show">
      <img src="./images/right.jpg" alt="" />
    </h1>
  </div>
</template>
      
<script>
export default {
  name: 'HeadSearch',
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    goSearch() {
      //代表的是如果有query参数也带过去
      let location = {
        name: 'search',
        params: { keyword: this.keyword || undefined },
        query: this.$route.query,
      }
      location.query = this.$route.query
      this.$router.push(location)
    },
  },
  //通过$bus清空输入框
  mounted() {
    this.$bus.$on('clear', () => {
      this.keyword = ''
    })
  },
}
</script>
      
<style lang="less" scope>
.bottom {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;

  .logoArea {
    float: left;

    .logo {
      img {
        width: 175px;
        margin-left: 20px;
      }
    }
  }

  .searchArea {
    float: left;
    margin-top: 45px;
    margin-left: 100px;
    .searchForm {
      overflow: hidden;

      input {
        box-sizing: border-box;
        width: 490px;
        height: 32px;
        padding: 0px 4px;
        border: 2px solid #ea4a36;
        float: left;

        &:focus {
          outline: none;
        }
      }

      button {
        height: 32px;
        width: 68px;
        background-color: #ea4a36;
        border: none;
        color: #fff;
        float: left;
        cursor: pointer;

        &:focus {
          outline: none;
        }
      }
    }
  }
  .rightArea {
    float: right;
    margin-right: 70px;
    img {
      margin-top: 10px;
      width: 190px;
    }
  }
}
</style>