<template>
  <div class="user-profile">
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="file" @change="onFillChange" />
    <van-cell title="头像" value="内容" is-link @click="$refs.file.click()">
      <van-image
        class="avatar"
        width="30"
        height="30"
        fit="cover"
        round
        :src="user.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      @click="isUpdateNameShow = true"
      is-link
    ></van-cell>
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateSexShow = true"
    ></van-cell>
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    ></van-cell>
    <van-popup v-model="isUpdateNameShow" style="height: 100%" position="bottom"
      ><update-name
        @update="loadUserProfile"
        @close="isUpdateNameShow = false"
        v-if="isUpdateNameShow"
        :localPropName="user.name"
    /></van-popup>
    <van-popup v-model="isUpdateSexShow" style="height: 30%" position="bottom"
      ><update-gendor
        @update="loadUserProfile"
        :propSex="user.gender"
        @close="isUpdateSexShow = false"
    /></van-popup>
    <van-popup
      v-model="isUpdateBirthdayShow"
      style="height: 30%"
      position="bottom"
      ><update-birthday
        @update="loadUserProfile"
        :propBirthday="user.birthday"
        @close="isUpdateBirthdayShow = false"
    /></van-popup>
    <van-popup
      v-model="isUpdatePhotoShow"
      style="height: 100%"
      position="bottom"
      ><update-photo
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
    /></van-popup>
  </div>
</template>
<script>
import { getUserProfile } from "@/api/user";
import UpdateName from "./components/update-name";
import UpdateGendor from "./components/update-gendor";
import UpdateBirthday from "./components/update-birthday";
import UpdatePhoto from "./components/update-photo";
export default {
  name: "UserProfile",
  components: { UpdateName, UpdateGendor, UpdateBirthday, UpdatePhoto },
  props: {},
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateSexShow: false,
      isUpdateBirthdayShow: false,
      isUpdateFileShow: false,
      isUpdatePhotoShow: false,
      img: null,
    };
  },
  created() {
    this.loadUserProfile();
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile({});
        console.log(data);
        this.user = data.data;
      } catch (error) {
        this.$toast.fail("数据出错");
      }
    },
    onFillChange() {
      const file = this.$refs.file.files[0];

      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(file);

      // 展示预览图片弹出层
      this.isUpdatePhotoShow = true;

      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      this.$refs.file.value = "";
    },
  },
};
</script>
<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
