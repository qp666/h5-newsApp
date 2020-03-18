<template>
  <div class="home">
    <div class="top-home">
      <van-icon @click="popup" class="top-icon" name="wap-nav" />

      <van-search
        @focus="$router.push('/search')"
        class="top-search"
        shape="round"
        background="pink"
        placeholder="请输入搜索关键词"
      />
      <van-icon class="top-icon" name="search" />
    </div>

    <van-tabs class="biaoBox" v-model="activeName">
      <van-tab
        :name="item.id"
        class="vantab"
        v-for="(item, index) in topList"
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
            <!--单元格 -->
            <van-cell
              v-for="(itm, idx) in item.list"
              :key="idx"
              :title="itm.title"
            >
              <template slot="title">
                <!-- 标题div -->
                <div class="title">
                  <span>{{ itm.title }}</span>
                  <img
                    style="width:116px;height:73px;"
                    v-if="itm.cover.type == 1"
                    :src="itm.cover.images"
                    alt=""
                  />
                </div>

                <!-- 图片div -->
                <van-grid
                  v-if="itm.cover.type == 3"
                  :border="false"
                  :column-num="3"
                >
                  <van-grid-item
                    v-for="(imgitem, index) in itm.cover.images"
                    :key="index"
                  >
                    <van-image style="height:73px;" :src="imgitem" />
                  </van-grid-item>
                </van-grid>

                <!-- 作者/评论/时间等信息 -->
                <div class="info">
                  <div class="info_3span">
                    <span class="info-span">{{ itm.aut_name }}</span>
                    <span class="info-span">{{ itm.comm_count }}评论</span>
                    <!-- 使用过滤器过滤时间 -->
                    <span class="info-span">{{
                      itm.pubdate | filterTime
                    }}</span>
                  </div>
                  <van-icon
                    @click="gomore(itm, item.list)"
                    class="info-more"
                    name="cross"
                  />
                </div>
              </template>

              <!-- 单元格结束 -->
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 弹出层 -->
    <popup :myList="topList" ref="popup" />
    <more ref="more" />
  </div>
</template>

<script>
import { setToken, getToken } from "@/utilis/token.js";
import { get_channels } from "@/api/channels.js";
import { get_articles } from "@/api/articles.js";
import popup from "./components/channels_popup";
import more from "./components/more";
export default {
  name: "home",

  props: {},
  //数据
  data() {
    return {
      activeName: "",
      topList: []
      // refreshing: false,
      // list: [],
      // loading: false,
      // finished: false
    };
  },
  //方法
  methods: {
    //点击弹出more组件
    gomore(item, list) {
      console.log(item, list);
      this.$refs.more.art_id = item.art_id;
      this.$refs.more.aut_id = item.aut_id;
      this.$refs.more.art_list = list;
      this.$refs.more.show = true;
    },
    onLoad(item) {
      // console.log("onL111");
      setTimeout(async () => {
        //如果是上拉刷新进来的话,refreshing就为true//就会清空数组,重新赋值
        if (item.refreshing) {
          item.list = [];
          item.refreshing = false;
        }

        // console.log("onL", this.refreshing);
        let res = await get_articles({
          channel_id: item.id,
          timestamp: item.pre_time,
          with_top: 0
        });
        if (res.data.results.length == 0) {
          item.finished = true;
          return;
        }
        //需要翻页功能就每次设置新的时间搓
        item.pre_time = res.data.pre_timestamp;
        //  item.pre_time = Date.now();
        console.log("频道列表数据:", res);
        //一进入的时候list为空,每次都是往list里面追加
        item.list.push(...res.data.results);

        //追加完以后loading为false就停止追加,因为一进入默认loading为true,如果不关闭会一直加载中
        item.loading = false;
      }, 500);
    },
    onRefresh(item) {
      console.log("onR", item.refreshing);
      item.loading = true;
      item.finished = false;
      item.pre_time = Date.now();
      this.onLoad(item);
      // setInterval(() => {
      //   this.refreshing = false;
      // }, 1000);
    },
    popup() {
      this.$refs.popup.show = true;
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {
    // filterTime(val) {
    //   return dayjs().from(val);
    // }
  },
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  async created() {
    if (this.$store.state.token) {
      let res = await get_channels();
      console.log("获取顶部导航栏的数组:", res);
      this.topList = res.data.channels;
      //  循环遍历topList数组 ,给每个元素定义属性
      this.topList.forEach(item => {
        //用this.$set定义的属性,会有响应式的特点,会被页面接收
        this.$set(item, "loading", false);
        this.$set(item, "refreshing", false);
        this.$set(item, "finished", false);
        this.$set(item, "list", []);

        // item.loading = false;
        // item.refreshing = false;
        // item.finished = false;

        //不用在页面显示,不用在标签内显示,所以不用渲染出来
        item.pre_time = Date.now();
      });
    } else {
      //判断没有登录是不是第一次进入
      if (getToken("pdList")) {
        this.topList = getToken("pdList");
      } else {
        //没有登录是第一次进入
        let res2 = await get_channels();
        console.log("获取顶部导航栏的数组:", res2);
        this.topList = res2.data.channels;
        //  循环遍历topList数组 ,给每个元素定义属性
        this.topList.forEach(item => {
          //用this.$set定义的属性,会有响应式的特点,会被页面接收
          this.$set(item, "loading", false);
          this.$set(item, "refreshing", false);
          this.$set(item, "finished", false);
          this.$set(item, "list", []);

          // item.loading = false;
          // item.refreshing = false;
          // item.finished = false;

          //不用在页面显示,不用在标签内显示,所以不用渲染出来
          item.pre_time = Date.now();
        });

        setToken("pdList", JSON.stringify(this.topList));
      }
    }
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

<style scoped lang="less">
.home {
  .top-home {
    background-color: pink;
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

      .title {
        display: flex;
        justify-content: space-between;
      }

      .info_3span {
        float: left;
        font-size: 12px;
        color: #999;
        .info-span {
          margin-right: 10px;
        }
      }

      .info-more {
        float: right;
        font-size: 18px;
        color: #999;
        border: 1px solid #edeff3;
        margin-top: 3px;
      }
    }
  }
}
</style>
