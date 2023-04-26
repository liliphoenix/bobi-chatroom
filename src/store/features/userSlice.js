import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit"
import { getUserInfo, login } from "../../api/user"

// 必须是initailState
const initialState = {
  token: "",
  userInfo: {},
  toUser: ""
}
export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload
    },
    toUser: (state, { payload }) => {
      state.toUser = payload
    }
  },
  extraReducers (builder) {
    builder.addCase(getToken.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.data.token)
      state.token = action.payload.data.token
    })
      .addCase(getToken.rejected, (state, action) => {
      })
    builder.addCase(getInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload.data
    })
      .addCase(getInfo.rejected, (state, action) => {
      })
  }
})
// 创建异步请求
export const getToken = createAsyncThunk("user/getToken", async (payload) => {
  try {
    const res = await login(payload)
    return res
  } catch (error) {
    return Promise.reject(error)
  }
})
export const getInfo = createAsyncThunk("user/getInfo", async () => {
  try {
    const res = await getUserInfo()
    return res
  } catch (error) {
    return Promise.reject(error)
  }
})

export const { toUser, setUserInfo } = tokenSlice.actions
export default tokenSlice.reducer