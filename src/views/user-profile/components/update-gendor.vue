<template>
  <div class="update-gendor">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      :default-index="propSex"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onPicker"
    />
  </div>
</template>
<script>
import { updateUserProfile } from "@/api/user";
export default {
  name: "UpdateGendor",
  props: {
    propSex: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      localGender: this.propSex,
    };
  },
  methods: {
    onPicker(picker, value, index) {
      console.log(picker, value, index);
      this.localGender = index;
    },
    async onConfirm() {
      console.log("ssssss", this.propSex);
      this.$toast.loading({
        message: "保存中",
        forbidClick: true,
        duration: 0,
      });
      try {
        const { data } = await updateUserProfile({
          gender: this.localGender,
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
<style lang="less" scoped></style>
