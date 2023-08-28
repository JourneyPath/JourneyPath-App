import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import {Routes, Route, Link} from "react-router-dom"
import Welcome from './components/Welcome'
import ActionPlanMain from './components/ActionPlanMain'
import UserPrompt from './components/UserPrompt'
import Dashboard from './components/Dashboard'
import { useState } from 'react'
import { app as firebaseApp, auth} from "../functions/firebaseConfig"
import { signOut, onAuthStateChanged } from 'firebase/auth'
import 'firebase/auth';


function App() {
  const [user, setUser] = useState(false)
  onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, you can access user data here
        setUser(user)
        setloggedIn(true)
        console.log(user.uid); // User ID
        console.log(user.email); // User's email
        console.log(user.displayName); // User's display name
    } else {
        // User is signed out
        setloggedIn(false)
    }
});

  const [loggedIn, setloggedIn] = useState(false)
  //const [user, setUser] = useState(false)

  console.log(user)

  
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully.");
        setloggedIn(false)
        setUser(false)
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out: ", error);
      });
  };
  
  
  return (
    <>
      <nav>
        <div className="navLink"> 
          JourneyPath
        </div>
        <ul>
          {loggedIn ? <div className="loggedIn">Hi {user.displayName}</div> : <div className="loggedIn">Welcome!</div>}
          <Link to='/' className="navLink">Home</Link>
          {
            loggedIn ? 
            <>
            <Link to='/dasboard' className="navLink"> Dashboard</Link>
            <Link to='/' onClick={handleSignOut} className="navLink"> Sign Out</Link>
            </>:
            <>
              <Link to='/login' className="navLink">login</Link>
              <Link to='/SignUp' className="navLink">Sign Up</Link>
            </>
          }
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={<LoginForm loggedIn={() => setloggedIn(!loggedIn)}/>} />
          <Route path='/SignUp' element={<SignUp loggedIn={() => setloggedIn(!loggedIn)}/>} />
          <Route path='/actionplan' element={<ActionPlanMain user={user}/>} />
          <Route path='/dasboard' element={<Dashboard />} />
        </Routes>
      </main>
    </>
  )
}

export default App
