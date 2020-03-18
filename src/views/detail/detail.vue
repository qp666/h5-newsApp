<template>
  <div class="detail">
    <van-nav-bar
      class="topNav"
      title="文章标题"
      left-arrow
      @click-left="$router.back()"
    >
      <van-icon class="icon_right" name="ellipsis" slot="right" />
    </van-nav-bar>

    <h2 class="title">CSS3——解决父级元素包裹子级元素的方法（伪元素+其他）</h2>
    <!-- 用户信息 -->

    <van-cell>
      <template slot="title">
        <div class="user_i">
          <img
            src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi"
            alt=""
          />
          <div class="user_t">
            <p>我是作业</p>
            <p>1年前</p>
          </div>

          <van-button icon="plus" type="info">关注</van-button>
        </div>
      </template>
    </van-cell>

    <!-- 内容区域 -->
    <div class="content">
      你要解决浮动的为题必须在父级的逻辑的后面加上一个p元素来清除浮动吧，你加完p元素之后破坏结构了，不好，咱相加，又不能加，就用伪元素最合适了吧！
      你要解决浮动的为题必须在父级的逻辑的后面加上一个p元素来清除浮动吧，你加完p元素之后破坏结构了，不好，咱相加，又不能加，就用伪元素最合适了吧！
      你要解决浮动的为题必须在父级的逻辑的后面加上一个p元素来清除浮动吧，你加完p元素之后破坏结构了，不好，咱相加，又不能加，就用伪元素最合适了吧！
    </div>

    <div class="btn_two">
      <van-button round icon="like">点赞</van-button>
      <van-button round icon="delete">不喜欢</van-button>
    </div>

    <h3 style="padding:10px;">猜你喜欢</h3>
  </div>
</template>

<script>
export default {
  name: "detailVue",

  props: {},
  //数据
  data() {
    return {};
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
  watch: {},
  //子页面
  components: {}
};
</script>

<style lang="less">
.detail {
  height: 100%;
  background-color: #fff;
  .topNav {
    background-color: pink;
    .van-nav-bar__title.van-ellipsis {
      font-size: 18px;
      color: #fff;
    }
    i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
      color: #fff;
    }

    .icon_right {
      color: #fff;
    }
  }

  .title {
    margin-top: 30px;
    text-align: center;
  }

  .user_i {
    margin-top: 30px;
    display: flex;
    margin-bottom: 40px;
    .user_t {
      color: #ccc;
      font-size: 13px;
      margin-left: 10px;
      flex: 1;
    }
    // justify-content: space-between;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .content {
    padding: 10px;
  }

  .btn_two {
    margin-top: 40px;
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
