<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirmBirthday"
      @cancel="$emit('close')"
      @change="changeBirthday"
    />
  </div>
</template>
<script>
import { updateUserProfile } from "@/api/user";
import dayjs from "dayjs";
export default {
  name: "UpdateBirthday",
  props: {
    propBirthday: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
    };
  },
  methods: {
    changeBirthday(v) {
      this.currentDate = v;
    },
    async confirmBirthday() {
      this.$toast.loading({
        message: "保存中",
        forbidClick: true,
        duration: 0,
      });
      try {
        const { data } = await updateUserProfile({
          birthday: dayjs(this.currentDate).format("YYYY-MM-DD"),
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
