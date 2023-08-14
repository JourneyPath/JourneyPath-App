import React from 'react'
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import {Routes, Route, Link} from "react-router-dom"
import './App.css'
import Welcome from './components/Welcome'

function App() {

  return (
    <>
      <nav>
        <div>
          Logo
        </div>
        <div>
          <Link to='/'><div>Home</div></Link>
          <Link to='/login'><div>login</div></Link>
          <Link to='/SignUp'><div>Sign Up</div></Link>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/SignUp' element={<SignUp />} />
        </Routes>
      </main>
    </>
  )
}

export default App
