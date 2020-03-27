<template>
  <div class="robot">
    <van-nav-bar title="小特朗普" left-arrow @click-left="$router.back()" />

    <!-- 聊天框 -->
    <div class="chat_wrap" ref="wrap">
      <div
        class="chat_item"
        v-for="(item, index) in list"
        :key="index"
        :class="{ user: item.isMe }"
      >
        <img
          :src="
            item.isMe
              ? $route.params.icon
              : 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=355261717,2796694699&fm=179&app=42&f=JPEG?w=121&h=140&s=9AB15184DE5278DC5E2095330300C090'
          "
          alt=""
        />
        <div class="chat_content">
          {{ item.content }}
        </div>
      </div>
    </div>
    <!-- 底部搜索框 -->
    <van-search
      @keydown.enter.prevent="send"
      left-icon="false"
      show-action
      action-text="发送"
      v-model="value"
      shape="round"
      background="#f4f5f6"
    />
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "robotVue",

  props: {},
  //数据
  data() {
    return {
      socket: null, //机器人路径初始化
      value: "",
      list: [
        {
          isMe: true,
          content: "你好,我是何万山"
        },
        { isMe: false, content: "你好,我是特朗普" }
      ]
    };
  },
  //方法
  methods: {
    //输入发送
    send() {
      if (this.value.trim() == "") {
        //如果输入是空就不执行下面的
        return;
      }
      // console.log("123");

      this.socket.emit("message", { msg: this.value, timestamp: Date.now() });
      this.list.push({
        isMe: true,
        content: this.value
      });
      //页面渲染完后
      this.$nextTick(() => {
        //元素滚动条的距离等于元素可以滚动的的高度, 让元素滚到最底下
        this.$refs.wrap.scrollTop = this.$refs.wrap.scrollHeight;
      });
      this.value = "";
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  created() {
    //不传参代表当前路径的服务器
    //请求这个服务器需要带token
    this.socket = io(
      "http://ttapi.research.itcast.cn?token=" + this.$store.state.token
    );
    this.socket.on("message", data => {
      console.log(data);
      this.list.push({
        isMe: false,
        content: data.msg
      });
      this.$nextTick(() => {
        //元素滚动条的距离等于元素可以滚动的的高度, 让元素滚到最底下
        this.$refs.wrap.scrollTop = this.$refs.wrap.scrollHeight;
      });
    });
  },
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {}
};
</script>

<style lang="less">
.robot {
  //导航栏
  .van-nav-bar.van-hairline--bottom {
    background-color: #3e9df8;

    i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
      color: white;
    }

    .van-nav-bar__title.van-ellipsis {
      color: white;
    }
  }
  //输入内容区域
  .chat_wrap {
    overflow: auto;
    //布局技巧
    position: fixed;
    top: 46px;
    bottom: 54px;
    width: 100%;
    // display: flex;
    margin-top: 10px;

    .chat_item {
      margin-bottom: 20px;
      display: flex;
      color: #fff;

      &.user {
        display: flex;
        flex-direction: row-reverse; //布局从右到左
        .chat_content {
          // margin-right: 15px;
          background-color: #0094ff;
        }
      }
      // align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-left: 15px;
        border-radius: 50%;
        margin-right: 15px;
      }

      .chat_content {
        border-radius: 10px;
        padding: 10px;
        // line-height: 35px;
        max-width: 55%;
        background-color: #ccc;
        // height: 50px;
      }
    }
  }
  //搜索框
  .van-search.van-search--show-action {
    position: fixed;
    width: 100%;
    bottom: 0px;
    left: 0px;
    .van-search__content--round {
      background-color: white;
    }

    .van-search__action {
      color: #ccc;
      padding: 0px 15px;
    }
  }
}
</style>
