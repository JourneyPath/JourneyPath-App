import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import {Routes, Route, Link} from "react-router-dom"
import Welcome from './components/Welcome'
import ActionPlanMain from './components/ActionPlanMain'
import { useState } from 'react'

function App() {

  const [ message, setMessage ] = useState(null)

  return (
    <>
      <nav>
        <div className="navLink"> 
          JourneyPath
        </div>
        <ul>
          <Link to='/' className="navLink">Home</Link>
          <Link to='/login' className="navLink">login</Link>
          <Link to='/SignUp' className="navLink">Sign Up</Link>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<Welcome setMessage={() => setMessage()} />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/actionplan' element={<ActionPlanMain messageFromComponentA={message} />} />
        </Routes>
      </main>
    </>
  )
}

export default App
