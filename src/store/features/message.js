import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit"
import { changeRoom, getMessage, login } from "../../api/user"

// 必须是initailState
const initialState = {
  message: null,
  showMessage: [],
  prvMessage: []
}
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    getmessage: (state, { payload }) => {
      console.log(payload)
      state.message = payload
    },
    setShow: (state, { payload }) => {
      state.showMessage = payload
    },
    setprv: (state, { payload }) => {
      state.prvMessage.push(payload)
    },
  },
  // extraReducers(builder) {
  //   builder.addCase(getMsgs.fulfilled, (state, action) => {
  //     state.message = action.payload.data
  //   })
  //     .addCase(getMsgs.rejected, (state, action) => {
  //     })
  //   builder.addCase(getRoomChat.fulfilled, (state, action) => {
  //     state.message.push(action.payload.data)
  //     state.message.flat()
  //   })
  //     .addCase(getRoomChat.rejected, (state, action) => {
  //     })
  // }
})


// export const getRoomChat = createAsyncThunk("message/room", async (data: RoomChat) => {
//   const res = await changeRoom(data)
//   return res
// })
// // 创建异步请求
// export const getMsgs = createAsyncThunk("message/getMsg", async () => {
//   const res = await getMessage()
//   return res
// })

// 获取的是actions派发对象
export const { getmessage, setShow, setprv } = messageSlice.actions

// redux-thunk来执行异步操作
export const getMessageAsync = () => {
  return async (dispatch) => {
    let res
    try {
      res = await getMessage()
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
    dispatch(getmessage(res.data))
  }
}

export default messageSlice.reducer