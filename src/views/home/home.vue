<template>
  <div class="home">
    <div class="top-home">
      <van-icon @click="showpop" class="iconQ" name="wap-nav" />
      <van-search
        @focus="$router.push('/search')"
        class="search"
        v-model="searchValue"
        shape="round"
        background="#3194ff"
        placeholder="请输入搜索关键词"
      />
      <van-icon class="iconQ" name="search" />
    </div>

    <van-tabs v-model="activeName">
      <van-tab
        :name="item.id"
        v-for="(item, index) in menuList"
        :key="index"
        :title="item.name"
      >
        <van-pull-refresh v-model="item.refreshing" @refresh="onRefresh(item)">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad(item)"
          >
            <van-cell
              v-for="(itm, idx) in item.topList"
              :key="idx"
              :title="itm.title"
            >
              <!-- 自定义标题内容 -->
              <template slot="title">
                <div class="title">
                  <span>{{ itm.title }}</span>
                  <img
                    v-if="itm.cover.type == 1"
                    :src="itm.cover.images"
                    style="width:116px;height:73px;"
                  />
                </div>
                <!-- 图片宫格 -->
                <van-grid
                  v-if="itm.cover.type == 3"
                  :border="false"
                  :column-num="3"
                >
                  <van-grid-item
                    v-for="(ittem, index) in itm.cover.images"
                    :key="index"
                  >
                    <van-image style="height:73px" :src="ittem" />
                  </van-grid-item>
                </van-grid>
                <!-- 作者/评论/时间信息 -->
                <div class="info">
                  <span class="info_span">{{ itm.aut_name }}</span>
                  <span class="info_span">{{ itm.comm_count }}评论</span>
                  <span class="info_span">{{ itm.pubdate | filterTime }}</span>
                  <van-icon
                    @click="goMore(itm, item.topList)"
                    class="info_icon"
                    name="cross"
                  />
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <popup ref="popup" :tpList="menuList" />
    <more ref="more" />
  </div>
</template>

<script>
import { get_channels } from "@/api/channel.js";

import { get_articles } from "@/api/articles.js";
import popup from "./components/articles";
import more from "./components/more.vue";
export default {
  name: "homevue",

  props: {},
  //数据
  data() {
    return {
      activeName: "",
      menuList: [], //菜单栏
      searchValue: "" //搜索框输入值
    };
  },
  //方法
  methods: {
    //跳转到举报页面
    goMore(item, list) {
      //把值传给more页面
      this.$refs.more.art_list = list;
      this.$refs.more.art_id = item.art_id;
      this.$refs.more.aut_id = item.aut_id;
      this.$refs.more.show = true;
    },
    showpop() {
      this.$refs.popup.show = true;
    },
    onLoad(item) {
      // console.log("1", item.loading);
      setTimeout(async () => {
        if (item.refreshing) {
          item.topList = [];
          item.refreshing = false;
        }
        let res = await get_articles({
          channel_id: item.id,
          timestamp: item.time,
          with_top: 1
        });
        if (res.data.results.length == 0) {
          return (item.finished = true);
        }

        item.time = res.data.pre_timestamp;
        console.log("频道返回数据:", res);
        //把返回的数据追加到数组里
        item.topList.push(...res.data.results);
        // console.log("2", item.loading);
        item.loading = false;
        // console.log("3", item.loading);
      }, 1000);
      //   if (this.refreshing) {
      //     this.list = [];
      //     this.refreshing = false;
      //   }

      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   this.loading = false;

      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
    onRefresh(item) {
      item.loading = true;
      item.finished = false;
      this.onLoad(item);
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  async created() {
    let res = await get_channels();
    console.log("主页菜单栏返回内容:", res);
    this.menuList = res.data.channels;

    this.menuList.forEach(item => {
      this.$set(item, "topList", []);
      this.$set(item, "loading", false);
      this.$set(item, "finished", false);
      this.$set(item, "refreshing", false);

      item.time = Date.now();
    });
    //     topList: [],
    // loading: false,
    // finished: false,
    // refreshing: false
  },
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {
    popup,
    more
  }
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

  .title {
    display: flex;
    justify-content: space-between;
  }
  .info {
    color: #999;
    span {
      margin-right: 10px;
      // color: #999;
      font-size: 12px;
    }

    .info_icon {
      float: right;
      border: 1px solid red;
      margin-top: 5px;
    }
  }
}
</style>
