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
      <Route path='/home' element={<Home/>}>
        <Route path=':id'/>
      </Route>
    </Routes>
    </>
  )
}

export default App
