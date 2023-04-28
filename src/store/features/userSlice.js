import { createSlice, } from "@reduxjs/toolkit"
import { changeUserInfo, getList, getUserInfo, login } from "../../api/user"
import { message } from "antd"


// 必须是initailState
const initialState = {
  token: "",
  userInfo: null,
  userList: null
}
export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload
    },
    userList: (state, { payload }) => {

      if (state.userList && state.userList.length == 10) {
        state.userList = state.userList.concat(payload)
      } else {
        state.userList = payload
      }

    },
  },
})
// 创建异步请求

// 获取用户信息
export const getUserInfoAsync = () => {
  return async dispatch => {
    const res = await getUserInfo()
    dispatch(setUserInfo(res.data))
  }
}
// 获取用户列表
export const getUserListAsync = (off, lim) => {
  return async dispatch => {
    const res = await getList(off, lim)
    dispatch(userList(res.data))
  }
}
// 登录
export const loginAsync = (userInfo) => {
  return async () => {
    let res
    try {
      res = await login(userInfo)
    } catch (error) {
      console.log(error)
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
    }
    sessionStorage.setItem("token", res.data.token)
    return res.data
  }
}
// 修改用户信息
export const changeUserInfoAsync = (data) => {
  return async dispatch => {
    console.log(data)
    const res = await changeUserInfo(data)

  }
}
export const { setUserInfo, userList } = tokenSlice.actions
export default tokenSlice.reducer