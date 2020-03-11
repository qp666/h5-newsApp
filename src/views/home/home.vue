<template>
  <div class="home">
    <div class="top-home">
      <van-icon class="top-icon" name="wap-nav" />

      <van-search
        class="top-search"
        shape="round"
        background="#3194ff"
        placeholder="请输入搜索关键词"
      />
      <van-icon class="top-icon" name="search" />
    </div>

    <van-tabs class="biaoBox">
      <van-tab
        class="vantab"
        v-for="(item, index) in topList"
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
  name: "home",

  props: {},
  //数据
  data() {
    return {
      topList: [],
      refreshing: false,
      list: [],
      loading: false,
      finished: false
    };
  },
  //方法
  methods: {
    onLoad() {
      console.log("onL", this.refreshing);
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
      console.log("onR被执行了", this.refreshing);
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
    console.log("获取顶部导航栏的数组:", res);
    this.topList = res.data.channels;
  },
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {}
};
</script>

<style scoped lang="less">
.home {
  .top-home {
    background-color: #3194ff;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 999;
    width: 100%;
    top: 0;
    // opacity: 0;

    .top-icon {
      font-size: 20px;
      color: #fff;
    }
    .top-search {
      flex: 1;
    }
  }
  /deep/ .biaoBox {
    // margin-top: 51px;
    .van-tabs__wrap {
      position: fixed;
      z-index: 999;
      width: 100%;
      margin-top: 54px;
    }

    .vantab {
      padding-top: 100px;
      padding-bottom: 50px;
    }
  }
}
</style>
