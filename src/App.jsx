import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import {Routes, Route, Link} from "react-router-dom"
import Welcome from './components/Welcome'
import ActionPlanMain from './components/ActionPlanMain'
import Dashboard from './components/Dashboard'
import { useState, useEffect } from 'react'
import { app as firebaseApp, auth} from "../functions/firebaseConfig"
import { signOut, onAuthStateChanged } from 'firebase/auth'
import 'firebase/auth';
import Test from './components/test'
import Contact from './components/Contact'
// import Calendar from './components/Calendar'
import Modal from 'react-modal';
import HelpForm from './components/HelpForm'


Modal.setAppElement('#root'); 

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [signOutModal, setSignOutModal] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setSignOutModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  // const closeSignOutModal = () => {
  //   setSignOutModal(false);
  // };

  const handleLoggedIn = () => {
    setLoggedIn(true);
  };

  const handleDropdownClick = () => {
    console.log('drop down event firing')
    setDropdownOpen(!isDropdownOpen); 

  };

  const closeSignOutModal = () => {
    console.log('check')
    setSignOutModal(false)
    console.log(signOutModal)
  }
  
  return (
    <>
      <nav>
        <h1>
          <Link to='/' className="navLink-header">hyperDrive</Link> 
        </h1>
        <ul className='nav-user-dropdown-cluster'>
          {loggedIn ? (
            <>
              <div className="loggedIn">Hi {user.displayName}</div>
              <li className="navDropdown">
                <a className="navLink" onClick={handleDropdownClick}>☰</a>
                <ul className={`dropdownMenu ${isDropdownOpen ? 'open' : ''}`}>
                  {/* <li><Link to='/' className="navLink">Home</Link></li> */}
                  <li><Link to='/dashboard' className="navLink">Dashboard</Link></li>
                  <li><Link to='/contact' className="navLink">About & Contact</Link></li>
                  <li><Link to='/' onClick={logout} className="navLink specialItem">Sign Out</Link></li>
                </ul>

              </li>
            </>
          ) : (
            <>
              {/* <Link to='/' className="navLink">Home</Link> */}
              <Link to='/login' className="navLink">Login</Link>
              <Link to='/SignUp' className="navLink">Sign Up</Link>
            </>
          )}
        </ul>
      </nav>
      <main className='main'>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/test' element={<Test />} />
          <Route path='/login' element={<LoginForm setUser={(el) => setUser(el)} loggedIn={handleLoggedIn} />} />
          <Route path='/SignUp' element={<SignUp setUser={(el) => setUser(el)} loggedIn={() => setLoggedIn(!loggedIn)}/>} />
          <Route path='/actionplan' element={<ActionPlanMain user={user}/>} />
          <Route path='/dashboard' element={<Dashboard uId={user?.uid}/>} />
          {/* <Route path='/calendar' element={<Calendar user={user}/>} />
          <Route path="/calendar/redirect" element={<Calendar user={user} isAuthenticated={true} />} /> */}
          <Route path='/helpform' element={<HelpForm />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        
        <Modal
          isOpen={signOutModal} 
          onRequestClose={() => closeSignOutModal()}
          contentLabel="SignOut Modal"
          className="formContainer"
          overlayClassName="modal-overlay"
          shouldCloseOnOverlayClick={false} 
        >
          <div>You have been logged out!</div>
          <button onClick={() => closeSignOutModal()}>Ok!</button>
        </Modal>
      </main>
      <footer>
        
        <div className='footerLinks'>
        <Link to='/contact' className="contact">About hyperDrive & Contact Information</Link>
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

