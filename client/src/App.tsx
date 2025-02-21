import './App.css'
import {Routes, Route} from 'react-router-dom'
import ScrollToTop from './components/User/ScrollToTop'
import Landing from './pages/Landing'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Product from './pages/Product'
import User from './pages/User'

function App() {

  return (
    <>
    <ScrollToTop/>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/product/:id' element={<Product/>}/>
      <Route path='/user/:username' element={<User/>}/>
      <Route path='*'/>
    </Routes>
    </>
  )
}

export default App
