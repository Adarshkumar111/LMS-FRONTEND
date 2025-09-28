import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import geyCurrentUser from './customHook/getCostumUser'

// export const serverURL = "http://localhost:8000"

const App = () => {
  geyCurrentUser()
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    
    </>
  )
}

export default App
