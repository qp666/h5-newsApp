<template>
  <van-popup
    class="popupBox"
    @close="isTrue = false"
    closeable
    close-icon-position="top-left"
    v-model="show"
    position="left"
    :style="{ height: '100%', width: '85%' }"
  >
    <div class="top-pop">
      <div class="t-pop-t">
        <span>我的频道</span>
        <van-button
          color="#f85a5a"
          @click="isTrue = !isTrue"
          round
          size="mini"
          plain
          >{{ isTrue ? "完成" : "编辑" }}</van-button
        >
      </div>

      <div class="t-pop-b">
        <span v-for="(item, index) in tpList" :key="index">
          <van-tag v-if="index != 0" size="large"
            >{{ item.name
            }}<van-icon @click="delList(item)" v-if="isTrue" name="clear"
          /></van-tag>
        </span>
      </div>
    </div>

    <div class="bot-pop">
      <div class="t-pop-t">
        <span>频道推荐</span>
      </div>

      <div class="t-pop-b">
        <span v-for="(item, index) in btList" :key="index">
          <van-tag @click="goTop(item)" size="large">+{{ item.name }}</van-tag>
        </span>
      </div>
    </div>
  </van-popup>
</template>

<script>
//获取所有频道数据接口
import {
  get_allChannels,
  edit_allChannels,
  del_allChannels
} from "@/api/channel.js";
export default {
  name: "articlesVue",

  props: {
    tpList: {}
  },
  //数据
  data() {
    return {
      isTrue: false, //编辑小图标
      // bqList: this.tpList,
      show: false,
      allList: []
    };
  },
  //方法
  methods: {
    //删除我的频道里的频道
    delList(item) {
      // console.log("123");
      // console.log(item);
      // this.allList.push(item);
      this.tpList.forEach((ittm, iddx) => {
        //如果传进来的item等于全部频道里的项
        if (item == ittm) {
          // 根据下标删除该项 ,删除一个
          this.tpList.splice(iddx, 1);
        }
      });

      let channels = this.tpList.slice(1).map((itm, idx) => {
        let obj = {
          id: itm.id,
          seq: idx + 1 //下标从1开始,因为0是推荐
        };
        return obj;
      });

      //调用设置频道数组接口把数组返回
      del_allChannels([item.id]);
    },
    //把所有频道里的标签点击添加到 我的频道
    goTop(item) {
      //遍历全部频道
      // this.allList.forEach((itm, idx) => {
      //   //如果传进来的item等于全部频道里的项
      //   if (item == itm) {
      //     // 根据下标删除该项 ,删除一个
      //     this.allList.splice(idx, 1);
      //   }
      // });

      // 新增的频道对象，只有id和name属性，没有pullLoading,loading,finished等属性，所以会报错 ，用$set加上这些属性即可（数据能在界面响应）
      this.$set(item, "topList", []);
      this.$set(item, "loading", false);
      this.$set(item, "finished", false);
      this.$set(item, "refreshing", false);

      item.time = Date.now();

      this.tpList.push(item);

      let channels = this.tpList.slice(1).map((itm, idx) => {
        let obj = {
          id: itm.id,
          seq: idx + 1 //下标从1开始,因为0是推荐
        };
        return obj;
      });

      //调用设置频道数组接口把数组返回
      edit_allChannels({ channels });
    }
  },
  //计算属性
  computed: {
    //下面的所有频道数组
    btList() {
      let aList = this.tpList.map(item => {
        return item.id;
      });

      return this.allList.filter(item => {
        //判断 aList里面有没有包含notAllList的 有就留下,没有就返回成一个新数组
        return !aList.includes(item.id);
      });
    }
  },
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  async created() {
    let res = await get_allChannels();
    console.log("所有频道数组", res.data.channels);
    this.allList = res.data.channels;

    // console.log(bqList);
  },
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {
    // tpList(val) {
    //   this.bqList = val;
    // }
  },
  //子页面
  components: {}
};
</script>

<style lang="less">
.popupBox {
  padding: 10px;
  i.van-icon.van-icon-cross.van-popup__close-icon.van-popup__close-icon--top-left {
    color: black;
    font-size: 25px;
  }

  // .van-popup.van-popup--left {
  // }
  .top-pop {
    margin-top: 60px;
    margin-bottom: 40px;
  }

  .t-pop-b {
    margin-top: 20px;

    //span
    span.van-tag.van-tag--large.van-tag--default {
      position: relative;
    }
    i.van-icon.van-icon-clear {
      position: absolute;
      color: red;
      top: -6px;
      right: -6px;
    }
  }
  .t-pop-t {
    display: flex;

    justify-content: space-between;
  }
  span.van-tag.van-tag--large.van-tag--default {
    margin-right: 10px;
    margin-top: 10px;
  }
}
</style>
