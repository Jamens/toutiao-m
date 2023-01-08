<template>
  <div class="article-list">
    <van-pull-refresh
      :success-text="refreshSuccessText"
      v-model="isLoading"
      @refresh="onRefresh"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article, i) in list"
          :key="i"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  components: { ArticleItem },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      refreshSuccessText: "刷新成功",
    };
  },
  created() {
    console.log(this.channel);
    // this.onLoad();
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      try {
        this.loading = true;
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
        });
        // if (Math.random() > 0.5) {
        //   JSON.parse("ssssssssssss");
        // }

        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
        console.log(data);
      } catch (error) {
        this.error = true;
        this.loading = false;
        this.$toast.fail("请求失败");
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
        });
        const { results } = data.data;
        this.list.unshift(...results);
        this.isLoading = false;
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
      } catch (error) {
        console.log(error);
        this.refreshSuccessText = "刷新失败";
        this.$toast.fail("刷新失败");
        this.isLoading = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
