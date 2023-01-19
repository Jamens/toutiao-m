<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, i) in myChannels"
        :key="i"
        @click="onMyChannelClick(channel, i)"
      >
        <van-icon
          v-show="isEdit && !fiexdChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span class="text" :class="{ active: i === active }" slot="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        icon="plus"
        class="grid-item"
        v-for="(channel, i) in recommendChannels"
        :key="i"
        :text="channel.name"
        @click="onAllChannel(channel)"
      />
    </van-grid>
  </div>
</template>
<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fiexdChannels: [0],
    };
  },
  created() {
    this.loadAllChannels();
  },
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id;
        });
      });
    },
    // recommendChannels() {
    //   const channels = [];
    //   this.allChannels.forEach((channel) => {
    //     const ret = this.myChannels.find((myChannel) => {
    //       return myChannel.id === channel.id;
    //     });
    //     if (!ret) {
    //       channels.push(channel);
    //     }
    //   });
    //   return channels;
    // },
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        console.log(data);
        this.allChannels = data.data.channels;
      } catch (error) {
        this.$toast("数据获取失败", error);
      }
    },
    async onAllChannel(channel) {
      // eslint-disable-next-line vue/no-mutating-props
      this.myChannels.push(channel);
      if (this.user) {
        try {
          console.log(channel);
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length,
          });
        } catch (error) {
          this.$$toast.error("保存失败");
        }
      } else {
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
      // eslint-disable-next-line vue/no-mutating-props
    },
    onMyChannelClick(channel, i) {
      console.log(channel, i);
      if (this.isEdit) {
        if (this.fiexdChannels.includes(i)) {
          return;
        }
        if (i <= this.active) {
          this.$emit("updata", this.active - 1, true);
        }
        // eslint-disable-next-line vue/no-mutating-props
        this.myChannels.splice(i, 1);
        this.deleteChannel(channel);
      } else {
        this.$emit("updata", i, false);
      }
    },
    async deleteChannel(channel) {
      if (this.user) {
        deleteUserChannel(channel.id);
      } else {
        console.log("测试");
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
