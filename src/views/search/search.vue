<template>
  <div class="search">
    <div class="search-top">
      <van-search
        class="top-search"
        v-model="searchValue"
        @input="search"
        background="pink"
      />
      <!-- 点击取消以后回到之前页面 -->
      <span @click="$router.back()">取消</span>
    </div>

    <!-- 历史记录区域 -->
    <div class="history" v-if="sList.length == 0">
      <!-- 标题 -->
      <div class="title">
        <span>历史记录</span>
        <van-icon name="delete" />
      </div>

      <!-- 内容 -->
      <div class="content">
        <van-row>
          <van-col class="history_item" span="12">span: 8</van-col>
          <van-col class="history_item" span="12">span: 8</van-col>
          <van-col class="history_item" span="12">span: 8</van-col>
        </van-row>
      </div>
    </div>

    <van-cell-group v-else>
      <van-cell
        icon="search"
        v-for="(item, index) in sList"
        :key="index"
        :title="item"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { get_articles } from "@/api/search.js";
export default {
  name: "searchVue",

  props: {},
  //数据
  data() {
    return {
      //   isTrue: true,
      searchValue: "", //搜索框的值
      sList: [] //联想词汇数组
    };
  },
  //方法
  methods: {
    //输入框的搜索事件
    async search() {
      if (this.searchValue == "") {
        this.sList.splice(0);
        return;
      }
      //   this.isTrue = false;
      let res = await get_articles({
        q: this.searchValue
      });

      this.sList = res.data.options;
      console.log("搜索框输入返回词组:", res);
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
.search {
  background-color: #fff;
  .search-top {
    padding-right: 5px;
    background-color: pink;
    display: flex;
    align-items: center;

    span {
      color: #fff;
    }
    .top-search {
      width: 90%;
    }
  }

  .history {
    .title {
      padding-left: 10px;
      padding-right: 10px;
      align-items: center;
      height: 45px;
      display: flex;
      justify-content: space-between;
    }

    .content {
      .history_item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 45px;
        border-top: 0.5px solid #ccc;

        &:nth-of-type(odd) {
          border-right: 0.5px solid #ccc;
        }
      }
    }
  }
}
</style>
