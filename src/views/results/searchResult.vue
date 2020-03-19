<template>
  <div class="result">
    <van-nav-bar
      class="topNav"
      title="搜索结果"
      left-arrow
      @click-left="$router.back()"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group>
        <van-cell
          v-for="(item, index) in resultsList"
          :key="index"
          :title="item.title"
          @click="$router.push(`/detail/${item.art_id}`)"
        >
          <template slot="title">
            <!-- 标题div -->
            <div class="title">
              <span>{{ item.title }}</span>
              <img
                style="width:116px;height:73px;"
                v-if="item.cover.type == 1"
                :src="item.cover.images"
                alt=""
              />
            </div>

            <!-- 图片div -->
            <van-grid
              v-if="item.cover.type == 3"
              :border="false"
              :column-num="3"
            >
              <van-grid-item
                v-for="(imgitem, index) in item.cover.images"
                :key="index"
              >
                <van-image style="height:73px;" :src="imgitem" />
              </van-grid-item>
            </van-grid>

            <!-- 作者/评论/时间等信息 -->
            <div class="info">
              <div class="info_3span">
                <span class="info-span">{{ item.aut_name }}</span>
                <span class="info-span">{{ item.comm_count }}评论</span>
                <!-- 使用过滤器过滤时间 -->
                <span class="info-span">{{ item.pubdate | filterTime }}</span>
              </div>
            </div>

            <van-row>
              <van-col @click="goPL" class="bot-item" span="8"
                ><van-icon class="bot_icon" name="comment-o" />评论</van-col
              >
              <van-col @click="goDZ" class="bot-item" span="8"
                ><van-icon class="bot_icon" name="like-o" />点赞</van-col
              >
              <van-col class="bot-item" span="8"
                ><van-icon class="bot_icon" name="exchange" />分享</van-col
              >
            </van-row>
          </template>

          <!-- 单元格结束 -->
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import { get_search } from "@/api/search.js";
export default {
  name: "result",

  props: {},
  //数据
  data() {
    return {
      loading: false,
      finished: false,
      resultsList: [],
      page: 1, //页码
      pageSize: 10 //页容量
    };
  },
  //方法
  methods: {
    //点击评论
    goPL() {
      if (this.checkLogin()) {
        console.log("去评论");
      }
    },
    //点击点赞
    goDZ() {
      if (this.checkLogin()) {
        console.log("去点赞");
      }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(async () => {
        let res = await get_search({
          page: this.page,
          per_page: this.pageSize,
          q: this.$route.params.key
        });

        this.page++; //发送接口完毕后把页码++下次请求下一页

        //计算有没有到最后一页
        //把返回的总容量,除以页容量,得出最大页码
        let pages = Math.ceil(res.data.total_count / this.pageSize);

        //如果当前页码大于最大页码则已经过了最后一页
        if (this.page > pages) {
          // 数据全部加载完成
          this.finished = true;
        } else {
          //如果没到最后一页就会有数据返回
          this.resultsList.push(...res.data.results); //把它加到数组里

          // 加载状态结束,可以下次进行加载
          this.loading = false;
        }

        // console.log(res);
      }, 1000);
    }
    // onClickLeft() {
    //   this.$toast("返回");
    // }
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
.result {
  .topNav {
    background-color: pink;
    .van-nav-bar__title.van-ellipsis {
      color: #fff;
    }
    i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
      color: #fff;
    }
  }

  .van-cell-group.van-hairline--top-bottom {
    background-color: #ccc;

    .van-cell {
      padding-bottom: 0px;
      padding: 0px;
      margin-bottom: 15px;

      .title {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        span {
          font-size: 17px;
        }
      }

      .info_3span {
        padding-left: 10px;
        padding-right: 10px;
        // float: left;
        font-size: 12px;
        color: #999;
        .info-span {
          margin-right: 10px;
        }
      }

      .bot-item {
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #ccc;
        border-top: 1px solid #ccc;

        &:nth-of-type(3) {
          border-right: none;
        }

        .bot_icon {
          margin-right: 5px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
