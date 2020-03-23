<template>
  <div class="mine">
    <!-- 头部区域 -->
    <div v-if="$store.state.token" class="top">
      <!-- 用户信息 -->
      <div class="user_info">
        <img
          class="top_img"
          @click="$router.push('/profile')"
          :src="myInfo.photo"
          alt=""
        />
        <span class="top_span">{{ myInfo.name }}</span>
      </div>
      <!-- 统计数据 -->
      <div class="data_info">
        <div class="data_info_item">
          <span class="oneSpan">{{ myInfo.art_count }}</span>
          <span>动态</span>
        </div>
        <div class="data_info_item">
          <span class="oneSpan">{{ myInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data_info_item">
          <span class="oneSpan">{{ myInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
      </div>

      <!-- 阅读时间 -->
      <div class="read_time">
        <div>今日阅读</div>
        <div>1分钟</div>
      </div>
    </div>

    <div v-else class="top">
      <!-- 用户信息 -->
      <div class="no_user_info">
        <img
          class="top_img"
          src="http://toutiao.research.itcast.cn/img/wd_weidl.png"
          alt=""
        />
      </div>
    </div>

    <!-- 中间操作区域 -->

    <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="underway-o" text="历史" />
      <van-grid-item icon="records" text="作品" />
    </van-grid>
    <!-- 下面功能区域 -->

    <van-cell-group class="bot_group">
      <van-cell title="消息通知" is-link to="index" />
      <van-cell title="用户反馈" is-link />
      <van-cell
        @click="$router.push({ name: 'robot', params: { icon: myInfo.photo } })"
        title="小智同学"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<script>
import { get_user } from "@/api/user.js";
export default {
  name: "mineVue",

  props: {},
  //数据
  data() {
    return {
      myInfo: []
    };
  },
  //方法
  methods: {},
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  async created() {
    let res = await get_user();
    console.log("用户个人信息", res);
    this.myInfo = res.data;
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
.mine {
  height: 100%;
  background-color: #f5f7f9;
  .top {
    position: relative;
    padding-bottom: 20px;
    background-color: pink;
    min-height: 200px;

    .no_user_info {
      padding-top: 50px;
      text-align: center;
      .top_img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .user_info {
      padding: 25px 35px;
      // margin-bottom: 30px;
      background-color: pink;
      display: flex;

      .top_img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }

      .top_span {
        color: #fff;
        font-size: 18px;
        margin-left: 15px;
        // color: black;
      }
    }

    .data_info {
      display: flex;
      justify-content: space-around;
      .data_info_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;

        .oneSpan {
          margin-bottom: 10px;
        }
      }
    }

    .read_time {
      position: absolute;
      right: 0;
      top: 55px;
      color: white;
      background-color: #ffddcb;
      padding: 5px 15px;
      text-align: center;

      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      font-size: 12px;
    }
  }

  .van-icon-star-o {
    color: red;
  }
  .van-icon-underway-o {
    color: orange;
  }
  .van-icon-records {
    color: #6a93ff;
  }

  .van-grid-item__text {
    font-size: 16px;
  }

  .bot_group {
    margin-top: 10px;

    .van-cell__title {
      span {
        font-size: 16px;
      }
    }
  }
}
</style>
