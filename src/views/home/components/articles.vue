<template>
  <van-popup
    closeable
    close-icon-position="top-left"
    v-model="show"
    position="left"
    :style="{ height: '100%', width: '85%' }"
  >
    <div class="top-pop">
      <div class="t-pop-t">
        <span>我的频道</span>
        <van-button color="#f85a5a" round size="mini" plain>编辑</van-button>
      </div>

      <div class="t-pop-b">
        <span v-for="(item, index) in bqList" :key="index">
          <van-tag v-if="index != 0" size="large">{{ item.name }}</van-tag>
        </span>
      </div>
    </div>

    <div class="bot-pop">
      <div class="t-pop-t">
        <span>频道推荐</span>
      </div>

      <div class="t-pop-b">
        <span v-for="(item, index) in [1, 2, 3, 4, 5]" :key="index">
          <van-tag size="large">标签</van-tag>
        </span>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "articlesVue",

  props: {
    tpList: {}
  },
  //数据
  data() {
    return {
      bqList: this.tpList,
      show: true
    };
  },
  //方法
  methods: {},
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  created() {},
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {
    tpList(val) {
      this.bqList = val;
    }
  },
  //子页面
  components: {}
};
</script>

<style lang="less">
i.van-icon.van-icon-cross.van-popup__close-icon.van-popup__close-icon--top-left {
  color: black;
  font-size: 25px;
}

.van-popup.van-popup--left {
  padding: 10px;
}
.top-pop {
  margin-top: 60px;
  margin-bottom: 80px;
}

.t-pop-b {
  margin-top: 20px;
}
.t-pop-t {
  display: flex;

  justify-content: space-between;
}
span.van-tag.van-tag--large.van-tag--default {
  margin-right: 10px;
  margin-top: 10px;
}
</style>
