<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="deleteAll">全部删除</span>
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, i) in searchHistories"
      :key="i"
      @click="onSearchItemClick(item, i)"
    >
      <van-icon v-show="isDeleteShow" name="close"></van-icon>
    </van-cell>
  </div>
</template>
<script>
export default {
  name: "SearchHistory",
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false,
    };
  },
  methods: {
    onSearchItemClick(item, i) {
      if (this.isDeleteShow) {
        //删除状态，删除历史记录
        // eslint-disable-next-line vue/no-mutating-props
        this.searchHistories.splice(i, 1);
      } else {
        //非删除状态，直接搜索
      }
    },
    //全部删除
    deleteAll() {
      this.$emit("clear-search-histories", []);
      this.isDeleteShow = false;
    },
  },
};
</script>
<style lang="less" scoped></style>
