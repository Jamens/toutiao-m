<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>
<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "SearchResult",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
    };
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText,
        });
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        console.log(results);
        if (this.results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
        this.$toast("数据获取失败");
      }
    },
  },
};
</script>
<style lang="less" scoped></style>
