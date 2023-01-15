<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        round
        size="small"
        type="info"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs
      type="line"
      class="channel-tabs"
      animated
      swipeable
      v-model="active"
    >
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <article-list :channel="item" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChennelEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <van-popup
      v-model="isChennelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit :myChannels="channels" :active="active"></channel-edit>
    </van-popup>
  </div>
</template>
<script>
import ChannelEdit from "./components/channel-edit";
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/article-list";
export default {
  name: "HomeIndex",
  components: { ArticleList, ChannelEdit },
  data() {
    return { active: 0, channels: [], isChennelEditShow: false };
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels();
        this.channels = data.data.channels;
        console.log(data);
      } catch (error) {
        this.$toast.fail("获取频道失败");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 90px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      color: #777;
      font-size: 30px;
      min-width: 200px;
      width: 220px;
      height: 82px;
      border-right: 1px solid #edeff3;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      // z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      opacity: 0.902;
      background: #fff;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0px;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
