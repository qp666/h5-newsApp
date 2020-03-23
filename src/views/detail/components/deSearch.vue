<template>
  <div class="deSearch">
    <van-search
      class="doS"
      left-icon=""
      shape="round"
      background="#fff"
      v-model="value"
      placeholder="写评论"
      @search="addPL"
    />
    <div class="doS_icon">
      <van-icon class="icon_2"  name="comment-o">
        <span v-if="booler" class="icon_span">{{ plcount }}</span></van-icon
      >

      <div v-if="booler">
        <van-icon
          @click="shouC"
          v-if="is_collected"
          color="red"
          class="icon_2"
          name="star"
        />
        <van-icon @click="shouC" v-else class="icon_2" name="star-o" />
        <van-icon class="icon_2" name="share" />
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/utilis/bus.js";
import { shouC_art, no_shouC_art } from "@/api/articles.js";

import { add_comments } from "@/api/comment.js";
export default {
  name: "deSearch",

  props: {
    is_collected: {}, //是否收藏
    booler: {}, //是否是评论回复界面
    com_id: {} //评论id
  },
  //数据
  data() {
    return {
      value: "", //搜索框的值
      plcount: 0
    };
  },
  //方法
  methods: {
    //添加评论
    async addPL() {
      //判断 登录了与  输入不为空 在发送请
      if (this.checkLogin() && this.value.trim() != "") {
        //如果是评论文章就是true
        if (this.booler) {
          let res = await add_comments({
            //文章id
            target: this.$parent.artList.art_id,
            content: this.value
          });
          this.value = ""; //发送请求完评论归空

          console.log("文章评论返回:", res);
          this.plcount++;
          //把返回来的值传入bus,输送到兄弟组件comment
          bus.$emit("newCmt", res.data.new_obj);
          this.$toast.success("评论成功!");
        } else {
          //评论回复就是false
          let res = await add_comments({
            //评论id
            target: this.com_id,
            content: this.value,
            art_id: this.$route.params.art_id
          });
          this.value = ""; //发送请求完评论归空
          this.$toast.success("回复评论成功!");
          //评论回复成功后
          bus.$emit("newPL", res.data.new_obj);
          console.log("回复评论返回:", res);
        }
      } else {
        this.$toast.fail("输入为空!");
      }
    },
    //收藏
    async shouC() {
      //判断有没有登录
      if (this.checkLogin()) {
        //如果等于true就是已经收藏过了,就要发起取消收藏请求
        console.log(this.is_collected);
        if (this.is_collected) {
          let res = await no_shouC_art({ art_id: this.$parent.artList.art_id });
          //   this.is_collected = false;
          this.$emit("update:is_collected", false);
          //   this.$emit("update:show", false);
          this.$toast.success("取消收藏!");
        } else {
          //发起收藏请求
          let res2 = await shouC_art({ target: this.$parent.artList.art_id });
          //设置为true,就是收藏
          this.$toast.success("已收藏!");
          this.$emit("update:is_collected", true);
          //   this.is_collected = true;
        }
      }
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  created() {
    // console.log("created", this.is_collected);
    bus.$on("total_count", data => {
      // console.log(data);
      this.plcount = data;
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
.deSearch {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;

  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  .doS {
    flex: 1;
  }

  .doS_icon {
    display: flex;
    i.icon_2.van-icon {
      margin-right: 25px;
      font-size: 20px;
    }

    span.icon_span {
      position: absolute;
      top: -15px;
      right: -17px;
      font-size: 9px;
      background-color: red;
      border-radius: 50%;
      color: #fff;
      width: 26px;
      height: 23px;
      display: block;
      text-align: center;
      line-height: 20px;
    }
  }
}
</style>
