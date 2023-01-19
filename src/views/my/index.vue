<template>
  <div class="my-container">
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image fit="cover" round class="avatar" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button round size="mini">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item" v-for="(item, i) in list" :key="i">
          <span class="count">{{ item.count }}</span>
          <span class="text">{{ item.text }}</span>
        </div>
      </div>
      <van-grid class="grid-nav" column-num="2" clickable>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
      <van-cell title="消息通知" is-link />
      <van-cell class="mb-9" title="小智同学" is-link />
      <van-cell
        v-if="user"
        class="logout-cell"
        title="退出登录"
        closeable
        @click="onLogout"
      />
    </div>
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user";
export default {
  name: "MyIndex",
  data() {
    return {
      userInfo: {},
      list: [
        {
          count: 0,
          text: "头条",
        },
        {
          count: 0,
          text: "关注",
        },
        {
          count: 0,
          text: "粉丝",
        },
        {
          count: 0,
          text: "获赞",
        },
      ],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    if (this.user) {
      this.loadUserInfo();
    }
  },
  methods: {
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo();
        console.log(data);
        this.userInfo = data.data;
        if (this.list.text === "头条") {
          this.list[0].count = data.data.art_count;
        } else if (this.list.text === "关注") {
          this.list[1].count = data.data.follow_count;
        } else if (this.list.text === "粉丝") {
          this.list[2].count = data.data.fans_count;
        } else {
          this.list[3].count = data.data.like_count;
        }
      } catch (error) {
        this.$toast("获取数据失败");
      }
    },
    onLogout() {
      this.$dialog
        .confirm({
          title: "确定退出吗？",
        })
        .then(() => {
          this.$store.commit("setUser", null);
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
      console.log("推出");
    },
  },
};
</script>
<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;

      .data-item {
        height: 130px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: #fff;
        flex: 1;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
    .grid-nav {
      .grid-item {
        height: 141px;
        i.toutiao {
          font-size: 45px;
        }
        .toutiao-shoucang {
          color: #eb5253;
        }
        .toutiao-lishi {
          color: #ff9d1d;
        }
        span .text {
          font-size: 28px;
        }
      }
    }
    .logout-cell {
      text-align: center;
      color: #eb5253;
    }
  }
}
</style>
