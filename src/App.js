import { useState } from 'react'
import Login from "./View/Login"
import 'antd/dist/reset.css'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Dayout from './Layout'
import Regist from "./View/Regist"

function App () {

  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/chatroom"></Link>
        <Link to="/"></Link>
        <Link to="/regist"></Link>
        <Routes>
          <Route path='/chatroom' element={<Dayout />}></Route>
          <Route path='/' element={<Login />}></Route>
          <Route path='/regist' element={<Regist />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
