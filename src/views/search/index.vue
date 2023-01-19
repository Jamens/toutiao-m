<template>
  <div class="search-container">
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        background="#3296fa"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <search-result :search-text="searchText" v-if="isResultShow" />
    <search-suggestion
      @search="onSearch"
      :search-text="searchText"
      v-else-if="searchText"
    />
    <search-history
      @clear-search-histories="searchHistories = []"
      :search-histories="searchHistories"
      v-else
    />
  </div>
</template>
<script>
import SearchResult from "./components/search-result";
import SearchSuggestion from "./components/search-suggestion";
import SearchHistory from "./components/search-history";
import { setItem, getItem } from "@/utils/storage";
export default {
  name: "SearchIndex",
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion,
  },
  data() {
    return {
      searchText: "",
      isResultShow: false,
      searchHistories: getItem("TOUTIAO_SEARCH_HISTORIES") || [],
    };
  },
  watch: {
    searchHistories: {
      handler(v) {
        setItem("TOUTIAO_SEARCH_HISTORIES", v);
      },
    },
  },
  methods: {
    onSearch(val) {
      //更新文本框
      this.searchText = val;
      //存取搜索历史记录,不要有重复数据，最新的排在最前面
      const index = this.searchHistories.indexOf(val);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(val);
      //渲染搜索结果
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>
<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
