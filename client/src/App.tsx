import './App.css'
import {Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home/' element={<Home/>}/>
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
