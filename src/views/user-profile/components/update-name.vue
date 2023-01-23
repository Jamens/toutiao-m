<template>
  <div class="update-name">
    <van-nav-bar
      title="设置昵称"
      left-arrow
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onUpdate"
    />
    <van-field
      class="field-wrap"
      v-model.trim="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>
<script>
import { updateUserProfile } from "@/api/user";
export default {
  name: "UpdateName",
  props: {
    localPropName: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      // message: this.value,
      localName: "",
    };
  },
  created() {
    this.localName = this.localPropName;
  },
  methods: {
    async onUpdate() {
      try {
        if (!this.localName) {
          this.$toast("请输入昵称");
          return;
        }
        const { data } = await updateUserProfile({
          name: this.localName,
        });
        console.log(data);
        this.$router.go(-1);
        this.$emit("update");
        this.$toast.success("更新成功");
      } catch (error) {
        this.$toast.fail("更新失败");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.field-wrap {
  padding: 20px;
}
/deep/.van-nav-bar__text {
  color: #fff;
}
</style>
