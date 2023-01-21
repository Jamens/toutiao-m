<template>
  <div class="collect-article">
    <van-button
      :loading="loading"
      :class="{ liked: value }"
      :icon="value ? 'star' : 'star-o'"
      @click="onCollect"
    />
  </div>
</template>
<script>
import { addCollect, deleteCollect } from "@/api/article";
export default {
  name: "CollectArticle",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: [Number, Object, String],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onCollect() {
      this.loading = true;
      try {
        if (this.value) {
          await deleteCollect(this.articleId);
        } else {
          await addCollect(this.articleId);
        }
        this.$emit("input", !this.value);
        this.$toast.success(!this.value ? "收藏成功" : "取消收藏");
      } catch (error) {
        this.$toast.fail("操作失败");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.liked {
  color: #ffa500;
}
</style>
