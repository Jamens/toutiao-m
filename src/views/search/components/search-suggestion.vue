<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, i) in suggestions"
      :key="i"
      icon="search"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="hightlight(item)"></div>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggestion } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [],
      htmlStr: 'Hello <span style="color:red">World</span>',
    };
  },
  watch: {
    searchText: {
      //   handler(value) {
      //     this.loadSearchSuggestions(value);
      //   },
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value);
        console.log(value);
      }, 200),
      immediate: true,
    },
  },
  methods: {
    async loadSearchSuggestions(value) {
      try {
        const { data } = await getSearchSuggestion(value);
        this.suggestions = data.data.options;
      } catch (error) {
        this.$toast("数据获取失败");
      }
    },
    hightlight(text) {
      const hightlight = `<span class="active">${this.searchText}</span>`;
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(reg, hightlight);
    },
  },
};
</script>
<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
