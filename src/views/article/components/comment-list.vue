<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="error"
    :immediate-check="false"
  >
    <comment-item
      v-for="(item, i) in list"
      :key="i"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>
<script>
import { getComment } from "@/api/commom";
import CommentItem from "./comment-item";
export default {
  name: "CommentList",
  components: { CommentItem },
  props: {
    source: {
      type: [String, Object, Number],
      required: true,
    },
    list: {
      type: Array,
      dafault: () => [],
    },
    type: {
      type: String,
      validator(value) {
        return ["a", "c"].includes(value);
      },
      default: "a",
    },
  },
  data() {
    return {
      error: false,
      // eslint-disable-next-line vue/no-dupe-keys
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
    };
  },
  created() {
    this.loading = true;
    this.onLoad();
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getComment({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit,
        });
        const { results } = data.data;
        // eslint-disable-next-line vue/no-mutating-props
        this.list.push(...results);
        this.$emit("onload-success", data.data);
        this.loading = false;
        console.log(data);
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
        this.$toast.fail("获取失败");
      }
    },
  },
};
</script>
<style lang="less" scoped></style>
