<template>
  <van-popup class="protoPop" v-model="show" :style="{ width: '80%' }">
    <div class="protoItem" @click="fileProto">
      从相册选择
      <input
        ref="protoFile"
        @change="uploadPhoto"
        type="file"
        style="display:none"
      />
    </div>
    <div class="protoItem">拍照</div>
    <div @click="show = false" class="protoItem">取消</div>
  </van-popup>
</template>

<script>
import { Dialog } from "vant";
import { ImagePreview } from "vant";
import { get_user_photo } from "@/api/user.js";
export default {
  name: "protoVue",

  props: {
    //传过来的用户数据
    userInfo: {}
  },
  //数据
  data() {
    return {
      show: false,
      photo: ""
    };
  },
  //方法
  methods: {
    //打开相册上传功能
    fileProto() {
      this.$refs.protoFile.click();
    },
    //上传照片值改变后的方法
    uploadPhoto() {
      this.photo = this.$refs.protoFile.files[0];

      //判断是否传了东西,如果没传东西 this.photo就是空,就不执行里面的代码,因为如果是空的话URL.createObjectURL(空)就会报错
      if (this.photo) {
        let url = URL.createObjectURL(this.photo);
        ImagePreview({
          images: [url],
          // startPosition: 1,
          showIndex: false, //不显示页码
          onClose: this.stopUPload //图片关闭时调用方法
        });
      }
    },
    //结束上传时做的事情
    stopUPload() {
      console.log(this.photo);

      Dialog.confirm({
        message: "是否设置该图片为头像"
      })
        .then(async () => {
          //点确定后发送请求到服务器更改图片
          let res = await get_user_photo({
            //把我们创建的photo 传给 data 里的photo
            photo: this.photo
          });
          // console.log(res.data.photo);

          //把上传好了的图片路径传给profile.vue 用来显示新的头像
          this.userInfo.photo = res.data.photo;
          this.show = false; //关闭弹出层
          // console.log(res);
        })
        .catch(() => {
          // on cancel
          console.log("取消");
        });
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

<style lang="less">
.protoPop {
  .protoItem {
    text-align: center;
    padding: 10px 0px;
  }
}
</style>
