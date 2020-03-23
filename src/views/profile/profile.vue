<template>
  <div class="profile">
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
      @click-right="onClickRight"
    />

    <van-cell-group class="top_zl">
      <van-cell @click="$refs.proto.show = true" title="头像" is-link>
        <template slot="default">
          <div>
            <img class="avatar" :src="userInfo.photo" alt="" />
          </div>
        </template>
      </van-cell>
      <van-cell
        title="昵称"
        @click="nameShow = true"
        is-link
        :value="userInfo.name"
      />
      <van-cell
        @click="introShow = true"
        title="介绍"
        is-link
        :value="userInfo.intro"
      />
    </van-cell-group>

    <van-cell-group>
      <van-cell
        @click="genderShow = true"
        title="性别"
        is-link
        :value="userInfo.gender ? '女' : '男'"
      />
      <van-cell
        @click="dateShow = true"
        title="生日"
        is-link
        :value="userInfo.birthday"
      />
    </van-cell-group>
    <proto :userInfo="userInfo" ref="proto" />

    <!-- 修改昵称 -->
    <van-popup v-model="nameShow" position="bottom">
      <van-field v-model="userInfo.name" />
    </van-popup>
    <!-- 修改简介 -->
    <van-popup v-model="introShow" position="bottom">
      <van-field v-model="userInfo.intro" />
    </van-popup>
    <!-- 性别修改 -->
    <van-popup class="gender" v-model="genderShow" position="bottom">
      <div @click="editGender(0)" class="genderItem">男</div>
      <div @click="editGender(1)" class="genderItem">女</div>
      <div @click="genderShow = false" class="genderItem">取消</div>
    </van-popup>
    <!-- 日期修改 -->
    <van-popup v-model="dateShow" position="bottom">
      <van-datetime-picker
        @cancel="dateShow = false"
        @confirm="editTime"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import proto from "./components/proto";
import { get_user, get_profile, edit_profile } from "@/api/user.js";
import dayjs from "dayjs";
export default {
  name: "profile",

  props: {},
  //数据
  data() {
    return {
      minDate: new Date("1966-1-1"),
      maxDate: new Date(),
      currentDate: new Date(),
      introShow: false,
      nameShow: false,
      genderShow: false,
      dateShow: false,
      userInfo: []
    };
  },
  //方法
  methods: {
    //修改事件方法
    editTime() {
      //把日期对象通过dayjs转换成字符串
      this.userInfo.birthday = dayjs(this.currentDate).format("YYYY-MM-DD");

      //隐藏日期选择器
      this.dateShow = false;
    },
    //修改性别方法
    editGender(i) {
      this.userInfo.gender = i;
      this.genderShow = false;
    },
    //导航栏保存按钮点击
    async onClickRight() {
      await edit_profile({
        name: this.userInfo.name,
        gender: this.userInfo.gender,
        intro: this.userInfo.intro,
        birthday: this.userInfo.birthday
      });

      this.$toast.success("保存成功");
      // this.$router.back();
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  async created() {
    let res = await get_user();
    this.userInfo = res.data;

    res = await get_profile();
    this.$set(this.userInfo, "birthday", res.data.birthday);
    this.$set(this.userInfo, "gender", res.data.gender);
  },
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {
    proto
  }
};
</script>

<style lang="less">
.profile {
  .gender {
    background-color: #ccc;
    .genderItem {
      background-color: #fff;
      text-align: center;
      padding: 20px;
      &:last-of-type {
        margin-top: 10px;
      }
    }
  }

  height: 100%;
  background-color: #f5f7f9;
  .van-nav-bar.van-hairline--bottom {
    background-color: pink;
  }
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  span.van-nav-bar__text {
    color: #fff;
  }
  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }

  .top_zl {
    margin-bottom: 10px;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
