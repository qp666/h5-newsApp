<template>
  <van-popup class="pop_more" @closed="isTrue = true" v-model="show">
    <van-cell-group v-if="isTrue">
      <van-cell icon="failure" @click="disLike" title="不感兴趣" />
      <van-cell
        icon="warning-o"
        @click="isTrue = false"
        title="反馈垃圾内容"
        is-link
      />
      <van-cell icon="delete" @click="block" title="拉黑作者" />
    </van-cell-group>

    <van-cell-group v-else>
      <van-cell @click="isTrue = true" icon="arrow-left" />
      <van-cell
        :title="item.title"
        @click="response(item.type)"
        v-for="(item, index) in disList"
        :key="index"
      />
    </van-cell-group>
  </van-popup>
</template>

<script>
import {
  dislike_articles,
  reports_articles,
  blacklists_articles
} from "@/api/articles.js";
export default {
  name: "more",

  props: {},
  //数据
  data() {
    return {
      isTrue: true,
      show: false,
      aut_id: "", //用户id
      art_id: "", //文章id
      art_list: [], //文章数组
      disList: [
        { type: 1, title: "标题夸张" },
        { type: 2, title: "低俗色情" },
        { type: 3, title: "错别字多" },
        { type: 4, title: "旧闻重复" },
        { type: 5, title: "广告软文" },
        { type: 6, title: "内容不实" },
        { type: 7, title: "涉嫌违法犯罪" },
        { type: 8, title: "侵权" },
        { type: 0, title: "其他问题" }
      ]
    };
  },
  //方法
  methods: {
    //拉黑事件
    async block() {
      this.art_list.forEach((item, index) => {
        if (item.art_id == this.art_id) {
          this.art_list.splice(index, 1);
          return;
        }
      });

      //调用拉黑用户接口
      let res = await blacklists_articles({
        target: this.aut_id.toString()
      });

      this.$toast("拉黑成功");
      this.show = false;
    },
    //举报事件
    async response(type) {
      this.art_list.forEach((item, index) => {
        if (item.art_id == this.art_id) {
          this.art_list.splice(index, 1);
          return;
        }
      });

      //调用举报文章接口
      let res = await reports_articles({
        target: this.art_id.toString(),
        type,
        remark: "没理由的不喜欢"
      });
      this.$toast("反馈成功");
      this.show = false;
    },
    //不感兴趣事件
    async disLike() {
      //   console.log("123");

      //   console.log(this.art_list);
      //   console.log(this.art_id.toString());

      //删除数组中跟art_id同一id的数据,删除一个
      this.art_list.forEach((item, index) => {
        if (item.art_id == this.art_id) {
          this.art_list.splice(index, 1);
          return;
        }
      });

      //   调用对新闻文章不感兴趣接口
      let res = await dislike_articles({
        target: this.art_id.toString()
      });
      this.$toast("操作成功");
      this.show = false;
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  created() {},
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {}
};
</script>

<style lang="less">
.pop_more {
  width: 85%;
}
</style>
