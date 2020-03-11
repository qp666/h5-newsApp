<template>
  <div class="login">
    <!--导航栏 -->
    <van-nav-bar title="登录" />

    <!--输入框 -->
    <van-field
      v-model="form.mobile"
      placeholder="请输入手机号"
      :error-message="valid.mobile"
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
    <van-button
      :loading="isLoading"
      loading-text="登录中..."
      type="info"
      size="large"
      @click="doLogin"
      >登录</van-button
    >
  </div>
</template>

<script>
import { go_login } from "@/api/login.js";
import { setToken } from "@/utilis/token.js";
export default {
  name: "login",

  props: {},
  //数据
  data() {
    return {
      isLoading: false, //登录动画的加载效果
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
    //登录
    async doLogin() {
      //async里面的await代码,会跟普通的js代码一样从上往下执行
      //如果验证手机号验证码格式正确就执行
      if (this.yanz()) {
        this.isLoading = true; //开启 加载动画效果
        console.log("格式验证全部正确");
        try {
          let res = await go_login(this.form);
          console.log("登录成功返回:", res);
          //登录成功后把返回的token 存入 vuex 中
          this.$store.commit("changeToken", res.data.token);
          this.$store.commit("changeRefresh_token", res.data.refresh_token);

          setToken("tokenInfo", JSON.stringify(res.data));
          // setToken("refresh_token", res.data.refresh_token);

          //跳转首页
          this.$router.push("/home");

          this.$toast.success("登录成功");
        } catch {
          console.log("验证失败");

          this.$toast.fail("验证失败");
        } finally {
          this.isLoading = false; //关闭 加载动画效果
          console.log("最后执行finally");
        }
        //````````````````````````````````````优化前
        // console.log("格式验证全部正确");
        // console.log(this.form.phone, this.form.code);
        // try {
        //   //try跟catch用来捕捉错误
        //   let res = await axios({
        //     url: "http://ttapi.research.itcast.cn/app/v1_0/authorizations",
        //     method: "post",
        //     data: { mobile: this.form.phone, code: this.form.code }
        //   });
        //   console.log(res);
        // } catch {
        //   //如果try里面的内容错了就会执行catch
        //   console.log("验证失败");
        // } finally {
        //   console.log("最后执行finally");
        // }
      } else {
        console.log("格式验证失败");
        this.$toast.fail("验证失败");
      }
    },
    //验证方法
    yanz() {
      let flag = true;
      //判断手机号格式是否正确
      if (/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.mobile)) {
        //如果正确就清空错误提示
        this.valid.mobile = "";
      } else {
        flag = false;
        this.valid.mobile = "请输入正确手机号";
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
  height: 100%;
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
