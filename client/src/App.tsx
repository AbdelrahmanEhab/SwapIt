import './App.css'
import {Routes, Route} from 'react-router-dom'
import Landing from './pages/LandingPage'
import SignUp from './pages/SignupPage'
import Login from './pages/LoginPage'
import Home from './pages/HomePage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home/:category' element={<Home/>}/>
      <Route path='/home/:category/:search' element={<Home/>}/>
      <Route path='/product/:id'/>
      <Route path='/user/:username'/>
      <Route path='*'/>
    </Routes>
    </>
  )
}

export default App
