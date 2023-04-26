

import request from "../utils/request"

export const login = (data) => {
  return request({
    url: "/auth/login",
    method: "post",
    data: data
  })
}
export const getMessage = () => {
  return request({
    url: "/message",
    method: "get"
  })
}
export const getList = (offset, limit) => {
  return request({
    url: `/auth/${offset}/${limit}`,
    method: "get",
  })
}
export const getUserInfo = () => {
  return request({
    url: "/auth/profile",
    method: "get",
  })
}
export const changeRoom = (data) => {

  return request({
    url: "/message/room",
    method: "post",
    data
  })
}
export const getHistory = (data) => {
  return request({
    url: "/message/friend",
    method: "post",
    data
  })
}
export const getNotRead = (data) => {
  return request({
    url: "/message/notread",
    method: "post",
    data: {
      username: data
    }
  })
}
export const removeHis = (data) => {
  return request({
    url: "/message/remove",
    method: "delete",
    data: {
      username: data.username,
      from: data.from
    }
  })
}
export const Regist = (data) => {
  return request({
    url: "/user",
    method: "post",
    data
  })
}
export const Checked = (data) => {
  return request({
    url: "/user/check",
    method: "post",
    data: {
      username: data
    }
  })
}
export const changeInfo = (data) => {
  return request({
    url: "/user/Info",
    method: "post",
    data: {
      url: data.url,
      username: data.username
    }
  })
}
export const changeUserInfo = (data) => {
  return request({
    url: "/user",
    method: "put",
    data
  })
}