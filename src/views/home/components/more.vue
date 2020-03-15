<template>
  <div class="moreBox">
    <van-popup @closed="isTrue = true" class="more" v-model="show">
      <van-cell-group v-if="isTrue">
        <van-cell @click="disLike" title="不感兴趣" icon="failure" />
        <van-cell
          title="反馈垃圾内容"
          icon="warning-o"
          @click="isTrue = !isTrue"
          is-link
        />
        <van-cell @click="blackUser" title="拉黑作者" icon="delete " />
      </van-cell-group>

      <van-cell-group v-else>
        <van-cell @click="isTrue = !isTrue" icon="arrow-left" />
        <van-cell
          @click="reports(item.type)"
          v-for="(item, index) in reportList"
          :key="index"
          :title="item.title"
          icon="delete "
        />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import {
  dislikes_articles,
  black_user,
  reports_article
} from "@/api/articles.js";
export default {
  name: "moreVue",

  props: {},
  //数据
  data() {
    return {
      isTrue: true,

      show: false,
      aut_id: "", //用户id
      art_id: "", //文章id
      art_list: [], //文章数组
      reportList: [
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
    //举报文章事件
    reports(type) {
      //遍历数组找到当前id跟数组里一样的项
      this.art_list.forEach((item, index) => {
        if (item.art_id == this.art_id) {
          //删除list里面当前项,删除1个
          this.art_list.splice(index, 1);
          return;
        }
      });

      //调用接口发送
      reports_article({
        target: this.art_id.toString(),
        type,
        remark: "就是举报你"
      });
      this.$toast("举报成功");
      this.show = false;
    },
    //拉黑用户事件
    blackUser() {
      //遍历数组找到当前id跟数组里一样的项
      this.art_list.forEach((item, index) => {
        if (item.aut_id == this.aut_id) {
          //删除list里面当前项,删除1个
          this.art_list.splice(index, 1);
          return;
        }
      });

      //调用接口发送
      black_user({ target: this.aut_id.toString() });
      this.$toast("拉黑成功");
      this.show = false;
    },
    //不感兴趣事件
    disLike() {
      //遍历数组找到当前id跟数组里一样的项
      this.art_list.forEach((item, index) => {
        if (item.art_id == this.art_id) {
          //删除list里面当前项,删除1个
          this.art_list.splice(index, 1);
          return;
        }
      });

      //调用接口发送
      dislikes_articles({ target: this.art_id.toString() });
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
.more {
  width: 85%;
}
</style>
