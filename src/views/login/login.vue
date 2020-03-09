<template>
  <div class="login">
    <!--导航栏 -->
    <van-nav-bar title="登录" />

    <!--输入框 -->
    <van-field
      v-model="form.phone"
      placeholder="请输入手机号"
      :error-message="valid.phone"
    >
      <template slot="left-icon">
        <span class="iconfont icon-phone02"></span>
      </template>
    </van-field>
    <van-field
      v-model="form.code"
      placeholder="请输入验证码"
      :error-message="valid.code"
    >
      <template slot="left-icon">
        <span class="iconfont icon-lock"></span>
      </template>
      <van-button slot="button" round size="small">发送验证码</van-button>
    </van-field>

    <!-- 登录按钮 -->
    <van-button type="info" size="large" @click="doLogin">登录</van-button>
  </div>
</template>

<script>
export default {
  name: "login",

  props: {},
  //数据
  data() {
    return {
      form: {
        phone: "", //手机
        code: "" //验证码
      },
      valid: {
        phone: "", //手机
        code: "" //验证码
      }
    };
  },

  //方法
  methods: {
    //登录
    doLogin() {
      if (this.yanz()) {
        console.log("全部通过");
      } else {
        console.log("验证失败");
      }
    },
    //验证方法
    yanz() {
      let flag = true;
      //判断手机号格式是否正确
      if (/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone)) {
        //如果正确就清空错误提示
        this.valid.phone = "";
      } else {
        flag = false;
        this.valid.phone = "请输入正确手机号";
      }
      if (this.form.code.length == 6) {
        //
        this.valid.code = "";
      } else {
        flag = false;
        this.valid.code = "请输入正确验证码";
      }
      return flag;
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

<style scoped lang="less">
.login {
  background-color: #f5f7f9;

  .van-nav-bar {
    background-color: #3e9df8;
    margin-bottom: 20px;
    .van-nav-bar__title {
      color: #fff;
    }
  }

  .van-button--round {
    background-color: #ededed;
  }
  .van-button--large {
    width: 90%;
    margin: 30px 19px;
  }
}
</style>
