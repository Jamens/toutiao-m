<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    :loading="followLoading"
    size="small"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    :loading="followLoading"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    >关注</van-button
  >
</template>
<script>
import { addFollow, deleteFollow } from "@/api/user";
export default {
  name: "FollowUser",
  model: {
    prop: "isFollowed",
    event: "update-is_follow",
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [String, Object, Number],
      required: true,
    },
  },
  data() {
    return {
      followLoading: false,
    };
  },
  methods: {
    async onFollow() {
      this.followLoading = true;
      try {
        if (this.isFollowed) {
          await deleteFollow(this.userId);
          // this.article.is_followed = false;
        } else {
          await addFollow(this.userId);
          // this.article.is_followed = true;
        }
        this.$emit("update-is_follow", !this.isFollowed);
        //this.article.is_followed = !this.article.is_followed;
      } catch (error) {
        let message = "操作失败，请重试";
        if (error.response && error.response.status === 400) {
          message = "你不能关注你自己";
        }
        this.$toast(message);
      }
      this.followLoading = false;
    },
  },
};
</script>
<style lang="less" scoped></style>
