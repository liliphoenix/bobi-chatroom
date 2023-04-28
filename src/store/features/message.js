import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit"
import { changeRoom, getHistory, getMessage, getNotRead, login } from "../../api/user"

// 必须是initailState
const initialState = {
  message: null,
  toUser: {
    username: "room1"
  },
  notRead: null
}
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    getmessage: (state, { payload }) => {
      state.message = payload
    },
    setToUser: (state, { payload }) => {
      console.log(payload)
      state.toUser = payload
    },
    addMessage: (state, { payload }) => {
      state.message.push(payload)
    },
    setNotRead: (state, { payload }) => {
      state.notRead = payload
    }
  },
})
export const { getmessage, setToUser, addMessage, setNotRead } = messageSlice.actions

// redux-thunk来执行异步操作
export const getMessageAsync = () => {
  return async (dispatch) => {
    let res
    try {
      res = await getMessage()
    } catch (error) {
      console.log(error)
    }
    dispatch(getmessage(res.data))
  }
}
export const getRoomMsgAsync = (data) => {
  return async (dispatch) => {
    let res
    try {
      res = await getHistory(data)
    } catch (error) {
      console.log(error)
    }
    dispatch(getmessage(res.data))
  }
}
export const getNotReadAsync = (data) => {
  return async (dispatch) => {
    let res
    try {
      res = await getNotRead(data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
    dispatch(setNotRead(res.data))
  }
}

export default messageSlice.reducer