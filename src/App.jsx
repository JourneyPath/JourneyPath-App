import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import {Routes, Route, Link} from "react-router-dom"
import Welcome from './components/Welcome'
import ActionPlanMain from './components/ActionPlanMain'
import Dashboard from './components/Dashboard'
import { useState } from 'react'
import { app as firebaseApp, auth} from "../functions/firebaseConfig"
import { signOut, onAuthStateChanged } from 'firebase/auth'
import 'firebase/auth';
import Test from './components/test'
import Calendar from './components/Calendar'
import Modal from "react-modal";
import HelpForm from './components/HelpForm'


function App() {
  const [loggedIn, setloggedIn] = useState(false)
  const [user, setUser] = useState(false)
  const [signOutModal, setSignOutModal]  = useState(false)
  onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, you can access user data here
        setUser(user)
        setloggedIn(true)
        // console.log(user.uid); // User ID
        // console.log(user.email); // User's email
        // console.log(user.displayName); // User's display name
    } else {
        // User is signed out
        setloggedIn(false)
    }
  });

  const handleLoggedIn = () => {
    setloggedIn(true); 
  };

  const logout = async () => {
    try {
        await signOut(auth)
        setSignOutModal(true)
    } catch (error){
        console.error(error)
    }
  };

  const closeSignOutModal = () => {
    console.log('check')
    setSignOutModal(false)
    console.log(signOutModal)
  }
  
  return (
    <>
      <nav>
        <h1 className="navLink"> 
          hyperDrive plans
        </h1>
        <ul>
          {loggedIn ? <div className="loggedIn">Hi {user.displayName}</div> : null}
          <Link to='/' className="navLink">Home</Link>
          {
            loggedIn ? 
            <>
            <Link to='/dashboard' className="navLink"> Dashboard</Link>
            <Link to='/calendar' className="calendarLink"> Calendar</Link>
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
          <Route path='/test' element={<Test />} />
          <Route path='/login' element={<LoginForm setUser={(el) => setUser(el)} loggedIn={handleLoggedIn} />} />
          <Route path='/SignUp' element={<SignUp setUser={(el) => setUser(el)} loggedIn={() => setloggedIn(!loggedIn)}/>} />
          <Route path='/actionplan' element={<ActionPlanMain user={user}/>} />
          <Route path='/dashboard' element={<Dashboard uId={user.uid}/>} />
          <Route path='/calendar' element={<Calendar user={user}/>} />
          <Route path="/calendar/redirect" element={<Calendar user={user} isAuthenticated={true} />} />
          <Route path='/helpform' element={<HelpForm />} />
        </Routes>
        <Modal
          isOpen={signOutModal} 
          onRequestClose={() => closeSignOutModal()}
          contentLabel="SignOut Modal"
          className="signOutMessage"
          overlayClassName="modal-overlay"
          shouldCloseOnOverlayClick={false} 
        >
        <div>You have been logged out!</div>
        <button onClick={() => closeSignOutModal()}>Ok!</button>
      </Modal>
      </main>
      <footer>
        <div className='footerLinks'>
        <Link to='/helpform' className="navLink"> Help Form</Link>
        </div>
        <p>
        © 2023 hyperDrive Plans. All rights reserved.
        </p>
      </footer>
    </>
  )
}

export default App
