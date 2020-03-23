<template>
  <div class="detail">
    <van-nav-bar
      class="topNav"
      title="文章标题"
      left-arrow
      @click-left="$router.back()"
    >
      <van-icon class="icon_right" name="ellipsis" slot="right" />
    </van-nav-bar>

    <h2 class="title">{{ artList.title }}</h2>
    <!-- 用户信息 -->


    <van-cell>
      <template slot="title">
        <div class="user_i">
          <img :src="artList.aut_photo" alt="" />
          <div class="user_t">
            <p>{{ artList.aut_name }}</p>
            <p>{{ artList.pubdate | filterTime }}</p>
          </div>
          <van-button @click="guanZ" v-if="artList.is_followed" type="info"
            >已关注</van-button
          >
          <van-button @click="guanZ" v-else icon="plus" type="info"
            >关注</van-button
          >
        </div>
      </template>
    </van-cell>

    <!-- 内容区域 -->
    <div class="content" v-html="artList.content"></div>

    <div class="btn_two">
      <van-button
        @click="zan"
        v-if="artList.attitude == 1"
        round
        plain
        icon="like"
        type="danger"
        >已点赞</van-button
      >
      <van-button @click="zan" v-else round icon="like">点赞</van-button>

      <!--  -->
      <van-button
        @click="disLike"
        v-if="artList.attitude == 0"
        round
        plain
        type="danger"
        icon="delete"
        >不喜欢</van-button
      >
      <van-button @click="disLike" v-else round icon="delete"
        >不喜欢</van-button
      >
    </div>

    <h3 style="padding:10px;">猜你喜欢</h3>
    <comment ref="comment" />
    <deSearch
      :booler="true"
      :is_collected.sync="artList.is_collected"
      ref="deSearch"
    />
    <reply ref="reply" />
  </div>
</template>

<script>
import {
  this_articles,
  like_art,
  no_like_art,
  disLike_art,
  no_disLike_art
} from "@/api/articles.js";
import { follow_no, follow_user } from "@/api/user.js";
import comment from "./components/comment";
import deSearch from "./components/deSearch";
import reply from "./components/reply";
export default {
  name: "detailVue",

  props: {},
  //数据
  data() {
    return {
      artList: []
    };
  },
  //方法
  methods: {
    //关注作者
    async guanZ() {
      //判断有没有登录
      if (this.checkLogin()) {
        //如果等于true就是已经关注过了,就要发起取消关注请求
        if (this.artList.is_followed) {
          let res = await follow_no({ aut_id: this.artList.aut_id });

          this.$toast.success("取消关注!");
          this.artList.is_followed = false;
        } else {
          //发起关注请求
          let res2 = await follow_user({ target: this.artList.aut_id });
          //设置为true,就是已关注
          this.$toast.success("关注成功!");
          this.artList.is_followed = true;
        }
      }
    },
    //文章点赞
    async zan() {
      //判断有没有登录
      if (this.checkLogin()) {
        //如果等于1就是已经点赞过了,就要发起取消点赞请求
        if (this.artList.attitude == 1) {
          let res = await no_like_art({ art_id: this.artList.art_id });
          this.artList.attitude = -1;

          this.$toast.success("取消点赞!");
        } else {
          //发起点赞请求
          let res2 = await like_art({ target: this.artList.art_id });
          //设置为1,就是点赞
          this.$toast.success("点赞成功!");
          this.artList.attitude = 1;
        }
      }
    },
    //对文章不喜欢
    async disLike() {
      //判断有没有登录
      if (this.checkLogin()) {
        //如果等于0就是已经不喜欢过了,就要发起取消不喜欢请求
        if (this.artList.attitude == 0) {
          let res = await no_disLike_art({ art_id: this.artList.art_id });
          this.artList.attitude = -1;

          this.$toast.success("取消不喜欢!");
        } else {
          //发起点赞请求
          let res2 = await disLike_art({ target: this.artList.art_id });
          //设置为1,就是点赞
          this.$toast.success("已不喜欢!");
          this.artList.attitude = 0;
        }
      }
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  async created() {
    //获取当前文章详情
    let res = await this_articles({ art_id: this.$route.params.art_id });
    this.artList = res.data;
    console.log("当前文章详情:", res);
  },
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {
    comment,
    deSearch,
    reply
  }
};
</script>

<style lang="less">
.detail {
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  .topNav {
    background-color: pink;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    .van-nav-bar__title.van-ellipsis {
      font-size: 18px;
      color: #fff;
    }
    i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
      color: #fff;
    }

    .icon_right {
      color: #fff;
    }
  }

  .title {
    margin-top: 80px;
    text-align: center;
  }

  .user_i {
    margin-top: 30px;
    display: flex;
    margin-bottom: 40px;
    .user_t {
      color: #ccc;
      font-size: 13px;
      margin-left: 10px;
      flex: 1;
    }
    // justify-content: space-between;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .content {
    // width: 100%;
    // overflow: hidden;
    padding: 10px;
    pre {
      width: 100%;
      * {
        cursor: pointer;
        word-break: break-all;
        white-space: pre-wrap;
      }
    }

    img {
      max-width: 100%;
    }
  }

  .btn_two {
    margin-top: 40px;
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
