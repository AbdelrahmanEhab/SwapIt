import './App.css'
import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
    </>
  )
}

export default App
