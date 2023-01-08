<template>
  <van-cell-group>
    <van-cell class="article-item">
      <div slot="title" class="title van-multi-ellipsis--l2">
        {{ article.title }}
      </div>

      <div slot="label">
        <div class="cover-wrap" v-if="article.cover.type === 3">
          <div
            class="cover-item"
            v-for="(img, i) in article.cover.images"
            :key="i"
          >
            <van-image
              class="cover-item-img"
              slot="default"
              :src="img"
              fit="cover"
            />
          </div>
        </div>
        <div class="label-info-wrap">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>

      <van-image
        class="right-cover"
        v-if="article.cover.type === 1"
        slot="default"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </van-cell>
  </van-cell-group>
</template>
<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    columns: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap {
    font-size: 22px;
    color: #b4b4b4;
    margin-left: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
