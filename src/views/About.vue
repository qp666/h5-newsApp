<template>
  <div class="about">
    <van-button type="default" @click="go">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-divider />
    <van-nav-bar title="标题" />

    <van-divider />

    <van-cell title="单元格" icon="location-o" />
    <van-divider />
    <van-cell  title="单元格" value="内容" size="large" />
    <van-cell title="单元格" value="内容" size="large" label="描述信息" />
  </div>
</template>

<script>
export default {
  name: "vue名",

  props: {},
  //数据
  data() {
    return {};
  },
  //方法
  methods: {
    go() {
      console.log("点击了默认按钮");
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

<style></style>
