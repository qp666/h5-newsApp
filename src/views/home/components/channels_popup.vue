<template>
  <van-popup
    @closed="isTrue = false"
    class="cha_pop"
    closeable
    close-icon="close"
    close-icon-position="top-left"
    v-model="show"
    position="left"
    :style="{ height: '100%', width: '85%' }"
  >
    <!-- 上面内容 -->
    <div class="top_pop">
      <div class="top_pop_one">
        <span>我的频道</span>
        <van-button
          round
          color="#f85a5a"
          size="mini"
          @click="isTrue = !isTrue"
          plain
          >{{ isTrue ? "完成" : "编辑" }}</van-button
        >
      </div>
      <span v-for="(item, index) in myList" :key="index">
        <van-tag class="ttag" v-if="index != 0" size="large"
          >{{ item.name }}
          <van-icon
            @click="delCha(item)"
            v-if="isTrue"
            class="ttageSon"
            name="clear"
        /></van-tag>
      </span>
    </div>

    <!-- 下面内容 -->
    <div class="bottom_pop">
      <div class="top_pop_one">
        <span>频道推荐</span>
      </div>
      <van-tag
        @click="getmyList(item)"
        v-for="(item, index) in noAllList"
        :key="index"
        size="large"
      >
        + {{ item.name }}</van-tag
      >
    </div>
  </van-popup>
</template>

<script>
import { setToken } from "@/utilis/token.js";
import {
  get_allChannels,
  get_user_Channels,
  del_user_Channels
} from "@/api/channels.js";
export default {
  name: "channels_popup",

  props: { myList: {} },
  //数据
  data() {
    return {
      isTrue: false,
      show: false,
      // myList: this.topp,
      // noAllList: [],
      allList: []
    };
  },
  //方法
  methods: {
    //我的频道的删除事件
    delCha(item) {
      //如果有token就是有登录,有登录就发送请求
      if (this.$store.state.token) {
        for (let i = 0; i < this.myList.length; i++) {
          if (this.myList[i] == item) {
            this.myList.splice(i, 1);
          }
        }

        del_user_Channels(item.id);
      } else {
        //如果没登录就删除本地的
        for (let i = 0; i < this.myList.length; i++) {
          if (this.myList[i] == item) {
            this.myList.splice(i, 1);
          }
        }
        //删完后把数组存入本地替换
        setToken("pdList", JSON.stringify(this.myList));
      }
    },

    // ---------------------------
    //把全部频道的数据点击的频道增加到我的频道
    getmyList(item) {
      //如果有token就是有登录,有登录就发送请求
      if (this.$store.state.token) {
        //用this.$set定义的属性,会有响应式的特点,会被页面接收
        this.$set(item, "loading", false);
        this.$set(item, "refreshing", false);
        this.$set(item, "finished", false);
        this.$set(item, "list", []);

        //不用在页面显示,不用在标签内显示,所以不用渲染出来
        item.pre_time = Date.now();

        //显示到我的频道
        this.myList.push(item);

        //创建一个数组channels 等于 我的频道的数据去掉第一个(推荐)通过map方法返回的数组
        let channels = this.myList.slice(1).map((itm, index) => {
          let obj = {
            id: itm.id,
            seq: index + 1
          };
          return obj;
        });

        //调用接口把channels数组作为对象传进去
        get_user_Channels({ channels });
      } else {
        //没有登录就保存到本地
        //用this.$set定义的属性,会有响应式的特点,会被页面接收
        this.$set(item, "loading", false);
        this.$set(item, "refreshing", false);
        this.$set(item, "finished", false);
        this.$set(item, "list", []);

        //不用在页面显示,不用在标签内显示,所以不用渲染出来
        item.pre_time = Date.now();

        //显示到我的频道
        this.myList.push(item);

        //创建一个数组channels 等于 我的频道的数据去掉第一个(推荐)通过map方法返回的数组
        // let channels = this.myList.slice(1).map((itm, index) => {
        //   let obj = {
        //     id: itm.id,
        //     seq: index + 1
        //   };
        //   return obj;
        // });

        // console.log(this.myList);

        setToken("pdList", JSON.stringify(this.myList));
      }
    }
  },
  //计算属性
  computed: {
    //
    noAllList() {
      //!2.利用数组的map方法把已有频道的id返回出来成一个数组 list1
      let list1 = this.myList.map(item => {
        return item.id;
      });

      //!3.利用数组的filter方法把所有频道的数组遍历 判断如果数组对象里面id跟 数组list1id不一样的就返回出来成为一个新数组,新数组就是把已有频道刨除后的数组
      return this.allList.filter(item => {
        return !list1.includes(item.id);
      });

      console.log("过滤后的所有频道:", this.noAllList);
    }
  },
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  async created() {
    let res = await get_allChannels();
    console.log("所有频道数据", res);
    //!1.获取所有频道
    this.allList = res.data.channels;
  },
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {
    // topp(val) {
    //   this.myList = val;
    // }
  },
  //子页面
  components: {}
};
</script>

<style lang="less">
.cha_pop {
  padding: 10px;
  i.van-icon.van-icon-close.van-popup__close-icon.van-popup__close-icon--top-left {
    color: black;
    font-size: 25px;
  }

  .top_pop {
    margin-top: 50px;
    margin-bottom: 30px;

    // .ttag {
    //   position: relative !important;
    //   .ttagSon {
    //     position: absolute;
    //     top: -8px;
    //     right: -8px;
    //   }
    // }
    i.ttageSon.van-icon.van-icon-clear {
      position: absolute;
      right: -5px;
      top: -5px;
      color: red;
    }

    span.ttag.van-tag.van-tag--large.van-tag--default {
      position: relative;
    }
  }
  .top_pop_one {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    //   padding: 10px;
  }

  span.van-tag.van-tag--large.van-tag--default {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
