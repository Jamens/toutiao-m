import request from "@/utils/request";
export const getComment = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/comments",
    params,
  });
};
export const addCommentLike = (target) => {
  return request({
    method: "POST",
    url: "/v1_0/comment/likings",
    target,
  });
};
export const deleteCommentLike = (target) => {
  return request({
    method: "DELETE",
    url: `/v1_0/comment/likings/${target}`,
    target,
  });
};
export const addComment = (data) => {
  return request({
    method: "DELETE",
    url: "/v1_0/comments",
    data,
  });
};
export const addComments = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/comments",
    data,
  });
};
