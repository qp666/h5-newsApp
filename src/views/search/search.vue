<template>
  <div class="search">
    <div class="search-top">
      <van-search
        class="top-search"
        v-model="searchValue"
        @input="goSearch"
        background="pink"
        @keydown.enter="goSearchResult(searchValue)"
      />
      <!-- 点击取消以后回到之前页面 -->
      <span @click="$router.back()">取消</span>
    </div>

    <!-- 历史记录区域 -->
    <div class="history" v-if="sList.length == 0">
      <!-- 标题 -->
      <div class="title">
        <span>历史记录</span>
        <van-icon @click="delSearch" name="delete" />
      </div>

      <!-- 内容 -->
      <div class="content">
        <van-row>
          <van-col
            v-for="(item, index) in historyList"
            :key="index"
            class="history_item"
            span="12"
            @click="goSearchResult(item)"
            >{{ item }}
            <van-icon @click.stop="delOneSearch(index)" name="cross" />
          </van-col>
        </van-row>
      </div>
    </div>

    <van-cell-group v-else>
      <van-cell icon="search" v-for="(item, index) in sList" :key="index">
        <template slot="title">
          <!-- 显示的时候显示新item,点击传值的时候传老item -->
          <div
            v-html="item.newItem"
            @click="goSearchResult(item.oldItem)"
          ></div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { stop_shake } from "@/utilis/stop_shake.js"; //函数防抖
import { get_articles } from "@/api/search.js";
import { setToken, getToken } from "@/utilis/token.js";
export default {
  name: "searchVue",

  props: {},
  //数据
  data() {
    return {
      //   isTrue: true,
      searchValue: "", //搜索框的值
      sList: [], //联想词汇数组
      // historyList: getToken("historyList") ? getToken("historyList") : [], //历史记录数组
      goSearch: stop_shake(this.search, 500),
      historyList: getToken("historyList") || [] //历史记录数组
      // tiemID: "" //防抖
    };
  },
  //方法
  methods: {
    //输入框的搜索事件
    async search() {
      if (this.searchValue == "") {
        // this.sList.splice(0);
        this.sList = [];
        return;
      }
      //   this.isTrue = false;
      let res = await get_articles({
        q: this.searchValue
      });

      this.sList = res.data.options;
      console.log("搜索框输入返回词组:", res);

      //把数组里的每一项给变成一个对象
      this.sList = this.sList.map(item => {
        //对象里的xinitem就是item转小写以后匹配的span加红色的item
        let newItem = item
          .toLowerCase()
          .replace(
            this.searchValue.toLowerCase(),
            `<span style="color:red">${this.searchValue}</span>`
          );

        //把新item跟老item返回出去替换sList
        return {
          newItem,
          oldItem: item
        };
      });
    },
    //历史记录全部删除
    delSearch() {
      //数组值改为空
      this.historyList = [];
      //存入local
      setToken("historyList", JSON.stringify(this.historyList));
    },
    // 历史记录内容的单个删除事件
    delOneSearch(index) {
      this.historyList.splice(index, 1);
      //数组去重
      // let set = new Set(this.historyList);

      // this.historyList = [...set];

      setToken("historyList", JSON.stringify(this.historyList));
    },
    //输入框的跳转事件
    goSearchResult(val) {
      //存入数组
      this.historyList.unshift(val);

      //数组去重
      let set = new Set(this.historyList);

      this.historyList = [...set];

      //存入localStorage
      setToken("historyList", JSON.stringify(this.historyList));
      this.$router.push(`/searchResult/${val}`);
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
  height: 100%;
  background-color: #ccc;
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
    background-color: #fff;
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
        // width: 75%;
        overflow: hidden;
        // white-space: nowrap;
        // text-overflow: ellipsis;
        padding: 20px;
        color: black;
        display: flex;
        justify-content: space-between;
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
