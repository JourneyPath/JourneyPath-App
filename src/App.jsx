import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import {Routes, Route, Link} from "react-router-dom"
import Welcome from './components/Welcome'
import ActionPlanMain from './components/ActionPlanMain'
import Dashboard from './components/Dashboard'
import { useState } from 'react'
import { app as firebaseApp, auth} from "../functions/firebaseConfig"
import { signOut } from 'firebase/auth'
import 'firebase/auth';


function App() {
  const [loggedIn, setloggedIn] = useState(false)
  const [user, setUser] = useState(false)

  console.log(user)

  const handleLoggedIn = () => {
    setloggedIn(true); 
  };

  const logout = async () => {
    try {
        await signOut(auth)
        
    } catch (error){
        console.error(error)
    }
    setloggedIn(false)
    window.alert("You have been logged out!")
};

  // const handleSignOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       console.log("User signed out successfully.");
  //       setloggedIn(false)
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //       console.error("Error signing out: ", error);
  //     });
  // };
  
  return (
    <>
      <nav>
        <div className="navLink"> 
          JourneyPath
        </div>
        <ul>
        {loggedIn ? <div className="loggedIn">Hi {user.name}</div> : <div className="loggedIn">Welcome!</div>}

          <Link to='/' className="navLink">Home</Link>
          {
            loggedIn ? 
            <>
            <Link to='/dasboard' className="navLink"> Dashboard</Link>
            <Link to='/' onClick={logout} className="navLink"> Sign Out</Link>
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
          <Route path='/login' element={<LoginForm setUser={(el) => setUser(el)} loggedIn={handleLoggedIn} />} />
          <Route path='/SignUp' element={<SignUp setUser={(el) => setUser(el)} loggedIn={() => setloggedIn(!loggedIn)}/>} />
          <Route path='/actionplan' element={<ActionPlanMain user={user}/>} />
          <Route path='/dasboard' element={<Dashboard user={user}/>} />
        </Routes>
      </main>
    </>
  )
}

export default App
