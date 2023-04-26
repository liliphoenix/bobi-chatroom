// index.ts 文件

import { configureStore } from "@reduxjs/toolkit"
import tokenSlice from "./features/userSlice"
import messageSlice from "./features/message"
// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    user: tokenSlice,
    msg: messageSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store