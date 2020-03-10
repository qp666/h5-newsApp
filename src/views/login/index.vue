<template>
  <div class="loginBox">
    <!-- 头部导航栏 -->
    <van-nav-bar title="登录" />

    <!-- 输入框 -->

    <van-field
      v-model="form.mobile"
      placeholder="请输入手机号"
      :error-message="valid.mobile"
    >
      <template slot="left-icon">
        <i class="iconfont icon-phone"></i>
      </template>
    </van-field>

    <van-field
      v-model="form.code"
      left-icon="smile-o"
      placeholder="请输入验证码"
      :error-message="valid.code"
    >
      <template slot="left-icon">
        <i class="iconfont icon-4101suo"></i>
      </template>
      <van-button class="btn" slot="button" size="small">发送验证码</van-button>
    </van-field>
    <van-button
      :loading="isLoading"
      loading-type="spinner"
      loading-text="正在登录..."
      type="info"
      size="large"
      @click="doLogin"
      >登录</van-button
    >
  </div>
</template>

<script>
import { setToken } from "@/utilis/token.js";
import { go_login } from "@/api/login.js";
export default {
  name: "login",

  props: {},
  //数据
  data() {
    return {
      isLoading: false, //加载效果
      form: {
        mobile: "18511111111", //手机
        code: "246810" //验证码
      },
      valid: {
        mobile: "", //手机
        code: "" //验证码
      }
    };
  },
  //方法
  methods: {
    async doLogin() {
      this.isLoading = true;
      //登录按钮点击
      console.log("登录按钮点击");
      if (this.yanz()) {
        try {
          let res = await go_login(this.form);
          console.log("点击登录按钮返回:", res);

          //把返回的token存到浏览器存储中
          setToken("token", res.data.token);
          setToken("refresh_token", res.data.refresh_token);

          //把返回的token存到vuex存储中
          this.$store.commit("changeToken", res.data.token);
          this.$store.commit("changeRefresh_token", res.data.refresh_token);

          this.$toast.success("登陆成功");
          this.$router.push("/");
        } catch {
          this.$toast.fail("手机号或验证码错误");
        } finally {
          console.log("执行完毕");
          this.isLoading = false;
        }
      } else {
        // console.log("验证失败");
        this.$toast.fail("验证失败");
        this.isLoading = false;
      }
    },
    yanz() {
      //验证输入格式是否正确

      let flag = true;
      if (/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.mobile)) {
        // console.log("手机号正确");
        this.valid.mobile = "";
      } else {
        flag = false;
        this.valid.mobile = "请正确填写手机号";
        // console.log("手机号错误");
      }
      if (this.form.code.length == 6) {
        // console.log("验证码正确");
        this.valid.code = "";
      } else {
        flag = false;
        this.valid.code = "请正确填写验证码";
        // console.log("验证码错误");
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

<style lang="less" scoped>
.loginBox {
  height: 100%;
  background-color: #f5f7f9;

  .van-nav-bar {
    background-color: #3e9df8;
    width: 100%;
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .btn {
    border-radius: 40px;
    background-color: #ededed;
  }
  .van-button--large {
    width: 90%;
    margin-left: 20px;
    margin-top: 20px;
  }
}
</style>
