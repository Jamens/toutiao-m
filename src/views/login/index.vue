<template>
  <div class="login-container">
    <van-nav-bar title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <van-form ref="loginForm" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          clearable
          clear-trigger
          v-model="user.mobile"
          name="mobile"
          placeholder="请输入手机号"
          :rules="userFormRules.mobile"
          type="number"
          maxlength="11"
          ><i slot="left-icon" class="toutiao toutiao-shouji"></i
        ></van-field>
        <van-field
          clearable
          clear-trigger
          v-model="user.code"
          name="code"
          placeholder="请输入验证码"
          :rules="userFormRules.code"
          type="number"
          maxlength="6"
        >
          <template #button>
            <van-count-down
              @finish="isCountDownShow = false"
              v-if="isCountDownShow"
              :time="1000 * 60"
              format="ss s"
            />
            <van-button
              v-else
              @click="onSendMsg"
              round
              class="send-sms-btn"
              size="small"
              type="default"
              native-type="button"
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
import { login, sendSms } from "@/api/user";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      isCountDownShow: false,
      userFormRules: {
        mobile: [
          { required: true, message: "请输入手机号" },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          // {
          //   pattern: /^d{6}$/,
          //   message: "验证码格式错误",
          // },
        ],
      },
      user: {
        mobile: "18666135290",
        code: "246810",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSendMsg() {
      console.log("sssss");
      try {
        await this.$refs.loginForm.validate("mobile");
        console.log("通过");
      } catch (error) {
        return console.log(error);
      }
      this.isCountDownShow = true;
      try {
        const res = await sendSms(this.user.mobile);
        console.log("res", res);
        this.$toast("发送成功");
      } catch (error) {
        this.isCountDownShow = false;
        if (error.response.status == 429) {
          this.$toast("发送太频繁");
        } else {
          this.$toast("发送失败");
        }
        console.log(error);
      }
    },
    async onSubmit() {
      const user = this.user;
      // eslint-disable-next-line no-undef
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const { data } = await login(user);
        this.$store.commit("setUser", data.data);
        this.$toast.success("登陆成功");
        this.$router.back();
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast("手机号验证码错误");
          console.log("手机号验证码错误");
        } else {
          this.$toast("登陆失败，稍后重试");
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
