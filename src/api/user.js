import request from "@/utils/request";
export const login = (data) => {
  return request({
    method: "POST",
    url: "v1_0/authorizations",
    data,
  });
};
export const sendSms = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: "/v1_0/user",
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  });
};
export const getUserChannels = () => {
  return request({
    method: "GET",
    url: "/v1_0/channels",
  });
};
export const addFollow = (target) => {
  return request({
    method: "POST",
    url: "/v1_0/user/followings",
    data: {
      target,
    },
  });
};
export const deleteFollow = (target) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/followings/${target}`,
  });
};
export const getUserProfile = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/profile",
  });
};
export const updateUserProfile = (data) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/profile",
    data,
  });
};
export const updateUserPhoto = (data) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/photo",
    data,
  });
};
