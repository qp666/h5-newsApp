<template>
  <div class="searchBox">
    <div class="top-search">
      <van-search
        v-model="searchV"
        @input="souSuo"
        class="ssearch"
        background="#3194ff"
      />
      <span @click="$router.back()">取消</span>
    </div>

    <!-- 历史记录 -->
    <div class="history" v-if="searchV == ''">
      <div class="title">
        <span>历史记录</span>
        <van-icon class="delIcon" name="delete" />
      </div>

      <van-row>
        <van-col class="span_item" span="12">span: 8</van-col>
        <van-col class="span_item" span="12">span: 8</van-col>
        <van-col class="span_item" span="12">span: 8</van-col>
      </van-row>
    </div>

    <!-- 搜索建议联想词汇 -->
    <div class="jianyi" v-else>
      <van-cell-group v-if="jyList.length > 0">
        <van-cell
          v-for="(item, index) in jyList"
          :key="index"
          :title="item"
          icon="search"
        />
      </van-cell-group>

      <van-cell-group v-else>
        <van-cell title="暂无联想词汇" icon="search" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { get_suggestion } from "@/api/search.js";
export default {
  name: "search",

  props: {},
  //数据
  data() {
    return {
      searchV: "", //搜索框输入绑定
      jyList: [] //联想词汇数组
    };
  },
  //方法
  methods: {
    //搜索框的输入事件
    async souSuo() {
      if (this.searchV == "") {
        //把数组清空
        this.jyList.splice(0);
        return;
      }
      let res = await get_suggestion({ q: this.searchV });
      console.log(res);

      //把接口的数组返回给建议数组
      this.jyList = res.data.options;
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
.searchBox {
  background-color: #fff;
  .top-search {
    background-color: #3194ff;
    padding-right: 5px;
    display: flex;
    align-items: center;
    color: #fff;
    .ssearch {
      width: 90%;
    }
  }

  .history {
    .title {
      font-size: 14px;
      padding: 10px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .delIcon {
        font-size: 22px;
      }
    }

    .span_item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 45px;
      border-top: 0.5px solid #ccc;

      &:nth-of-type(odd) {
        border-right: 0.5px solid #ccc;
      }
    }
  }
}
</style>
