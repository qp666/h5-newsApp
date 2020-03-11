<template>
  <div class="home">
    <div class="top-home">
      <van-icon class="iconQ" name="wap-nav" />
      <van-search
        class="search"
        v-model="searchValue"
        shape="round"
        background="#3194ff"
        placeholder="请输入搜索关键词"
      />
      <van-icon class="iconQ" name="search" />
    </div>

    <van-tabs>
      <van-tab
        v-for="(item, index) in menuList"
        :key="index"
        :title="item.name"
      >
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { get_channels } from "@/api/home.js";
export default {
  name: "homevue",

  props: {},
  //数据
  data() {
    return {
      menuList:[],//菜单栏
      searchValue: "", //搜索框输入值
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  //方法
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      setInterval(() => {
        this.refreshing = false;
      }, 1000);
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  async created() {
    let res = await get_channels();
    console.log('主页菜单栏返回内容:',res);
    this.menuList = res.data.channels
    
  },
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {}
};
</script>

<style lang="less">
.home {
  .top-home {
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    align-items: center;
    background-color: #3194ff;

    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;

    .search {
      flex: 1;
    }

    .iconQ {
      font-size: 20px;
      color: #fff;
    }
  }

  .van-tabs__wrap {
    position: fixed;
    top: 54px;
    z-index: 999;
    width: 100%;
  }

  .van-tab__pane {
    padding-top: 100px;
    padding-bottom: 50px;
  }
}
</style>
