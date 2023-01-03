<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="user.mobile"
          name="用户名"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
          ><i slot="left-icon" class="toutiao toutiao-shouji"></i
        ></van-field>
        <van-field
          v-model="user.code"
          name="密码"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #button>
            <van-button round class="send-sms-btn" size="small" type="default"
              >发送验证码</van-button
            >
          </template>
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i
        ></van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { login } from "@/api/user";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      const user = this.user;
      try {
        const res = await login(user);
        console.log(res);
      } catch (error) {
        if (error.response.status === 400) {
          console.log("手机号验证码错误");
        } else {
          console.log("登陆失败，稍后重试", error);
        }
        console.log(error);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
    background-color: #ededed;
  }
  .login-btn-wrap {
    padding: 53px 33px;
  }
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>
