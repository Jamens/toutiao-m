import Vue from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");
Vue.filter("relativeTime", (value) => {
  return dayjs().to(dayjs(value));
});
// console.log(dayjs().format("YYYY-MM-DD"));
// 31 年后
// dayjs().from(dayjs('1990-01-01'), true) // 31 年
// dayjs().fromNow()

// dayjs().to(dayjs('1990-01-01')) // 31 年前
// dayjs().toNow()
// console.log(dayjs().from(dayjs("1990-01-01")));
