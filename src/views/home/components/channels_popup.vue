<template>
  <van-popup
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
        <van-button round color="#f85a5a" size="mini" plain>编辑</van-button>
      </div>
      <span class="ttag" v-for="(item, index) in abcList" :key="index">
        <van-tag v-if="index != 0" size="large">{{ item.name }}</van-tag>
      </span>
    </div>

    <!-- 下面内容 -->
    <div class="bottom_pop">
      <div class="top_pop_one">
        <span>频道推荐</span>
      </div>
      <van-tag
        v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8]"
        :key="index"
        size="large"
        >标签</van-tag
      >
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "channels_popup",

  props: { topp: {} },
  //数据
  data() {
    return {
      show: false,
      abcList: this.topp
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
    topp(val) {
      this.abcList = val;
    }
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
