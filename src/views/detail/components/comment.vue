<template>
  <div class="comment">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <template slot="title">
          <div class="commentBB">
            <!-- 头像 -->
            <img class="user_img" :src="item.aut_photo" alt="" />
            <!-- 用户信息 -->
            <div class="info2">
              <div class="user">{{ item.aut_name }}</div>
              <div class="speak">{{ item.content }}</div>
              <div class="bot">
                <span class="bot_time">{{ item.pubdate | filterTime }}</span>
                <van-tag round class="bot_tag" color="#eff7f8"
                  >回复{{ item.reply_count }}</van-tag
                >
              </div>
            </div>
            <!-- 点赞 -->
            <div class="like">
              <van-icon
                @click="zan(index, item.com_id)"
                v-if="item.is_liking"
                class="icon_like"
                color="red"
                name="like"
              />
              <van-icon
                @click="zan(index, item.com_id)"
                v-else
                class="icon_like"
                color="red"
                name="like-o"
              />
              <span>{{ item.like_count }}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import bus from "@/utilis/bus.js";

import { get_comments, likings_comments } from "@/api/comment.js";
export default {
  name: "commentVue",

  props: {},
  //数据
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      //判断是不是最后一页评论
      offset: undefined
    };
  },
  //方法
  methods: {
    //对评论点赞方法
    async zan(index, id) {
      if (this.checkLogin()) {
        //如果登录了才能点赞
        let res = await likings_comments({ target: id });
        console.log(res);
        //如果是点赞过了,那就要取消点赞
        if (this.list[index].is_liking) {
          //变空心
          this.list[index].is_liking = false;
          //点赞数量-1
          this.list[index].like_count--;
        } else {
          //变红心
          this.list[index].is_liking = true;
          //点赞数量加1
          this.list[index].like_count++;
        }
      }
    },
    async onLoad() {
      let res = await get_comments({
        type: "a",
        source: this.$route.params.art_id, //文章id
        offset: this.offset, //传下一页
        limit: 10 //页容量默认为10
      });
      console.log("当前文章评论详情:", res);

      this.offset = res.data.last_id; //把收到的下一页id替换
      this.list.push(...res.data.results);

      if (res.data.end_id == res.data.last_id) {
        //如果相等代表已经是最后一页数据
        this.finished = true;
      } else {
        this.loading = false;
      }

      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // for (let i = 0; i < 10; i++) {
      //   this.list.push(this.list.length + 1);
      // }
      // // 加载状态结束
      // this.loading = false;
      // // 数据全部加载完成
      // if (this.list.length >= 40) {
      //   this.finished = true;
      // }
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  created() {
    //接收bus传过来的数据
    bus.$on("newCmt", data => {
      this.list.unshift(data);
    });
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
.comment {
  margin-top: 40px;
  margin-bottom: 55px;
  .commentBB {
    display: flex;
    .user_img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .info2 {
      margin-left: 10px;
      flex: 1;
      .user {
        color: #708ab6;
        font-size: 17px;
      }

      .bot {
        .bot_tag {
          margin-left: 15px;
          padding: 5px 15px;
          color: black;
        }
      }
    }

    .like {
      display: flex;
      //   align-content: center;
      .icon_like {
        margin-right: 5px;
        font-size: 25px;
      }
      span {
        margin-top: 2px;
      }
    }
  }
}
</style>
