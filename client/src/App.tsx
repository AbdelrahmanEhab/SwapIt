import './App.css'
import {Routes, Route} from 'react-router-dom'
import ScrollToTop from './components/User/ScrollToTop'
import Landing from './pages/Landing'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import Verify from './pages/Verify'
import Home from './pages/Home'
import Product from './pages/Product'
import User from './pages/User'
import Post from './pages/Post'
import { Navigate } from "react-router-dom";

function App() {

  return (
    <>
    <ScrollToTop/>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/home' element={<Navigate to="/" replace />}/>
      <Route path='/product/:id' element={<Navigate to="/" replace />}/>
      <Route path='/user/:username' element={<Navigate to="/" replace />}/>
      <Route path='/post' element={<Navigate to="/" replace />}/>
      <Route path='*'/>
    </Routes>
    </>
  )
}

export default App
