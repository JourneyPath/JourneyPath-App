import { useState } from 'react';
import { app as firebaseApp } from "../../functions/firebaseConfig"
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { updateProfile } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';
import ConsentModal from './ConsentModal';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [userConsent, setUserConsent] = useState(false);
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();

  const openConsentModal = () => {
    setShowConsentModal(true);
  };

  const closeConsentModal = () => {
    setShowConsentModal(false);
  };

  const handleConsent = () => {
    setUserConsent(true); // Set userConsent to true
    closeConsentModal();
    handleSignUp(); // Now, proceed with the registration
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data in the database
      await updateProfile(auth.currentUser, {
        displayName: name
      });

      console.log('Display name set successfully');
      props.setUser(auth.currentUser);
      setError('');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      {error && <p>{error}</p>}
      <form className="formContainer">
        <h2>Sign Up</h2>
        <div className="formElement">
          <label>Name:</label>
          <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="formElement">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="formElement">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" onClick={openConsentModal}>
          Sign Up
        </button>
      </form>
      <ConsentModal
        isOpen={showConsentModal}
        onRequestClose={closeConsentModal}
        onAgree={handleConsent}
        onDisagree={closeConsentModal}
      />
    </div>
  );
};

export default SignUp;





// import { useState } from 'react';
// import { app as firebaseApp } from "../../functions/firebaseConfig"
// import { getFirestore, doc, setDoc } from "firebase/firestore";
// import { updateProfile } from 'firebase/auth';
// import {createUserWithEmailAndPassword,
//         getAuth,
//        } from 'firebase/auth';
// import ConsentModal from './ConsentModal';
// import { useNavigate } from 'react-router-dom';

// const SignUp = (props) => {
//   const auth = getAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState("");
//   const [error, setError] = useState('');
//   const [showConsentModal, setShowConsentModal] = useState(false); // State for the consent modal
//   const [userConsent, setUserConsent] = useState(false); // Set userConsent to true by default
//   const db = getFirestore(firebaseApp)
//   const navigate = useNavigate();

//   const openConsentModal = () => {
//     setShowConsentModal(true);
//   };

//   // Function to close the consent modal
//   const closeConsentModal = () => {
//     setShowConsentModal(false);
//   };

//   const handleConsent = () => {
//     setUserConsent(true); 
//     closeConsentModal();
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     try {
//       openConsentModal();
//       if (userConsent) {
//         await createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           // User registered successfully
//           const user = userCredential.user;
//           // Save user data in the database
//           updateProfile(auth.currentUser, {
//               displayName: name
//           }).then(() => {
//               console.log('Display name set successfully');
//               props.setUser(auth.currentUser)
//               navigate('/dashboard')
//           }).catch(error => {
//               console.log('Error setting display name:', error);
//           });
//           console.log(user)
//         })
//       } else {
//         setError('You must agree to the terms of use to register and use this service.');
//         closeConsentModal();
//         navigate('/')
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="container">
//       {error && <p>{error}</p>}
//       <form  className="formContainer" onSubmit={handleSignUp}>
//         <h2>Sign Up</h2>
//         <div className="formElement">  
//           <label>Name:</label>
//           <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
//         </div>
//         <div className="formElement">  
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div className="formElement">  
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//       <ConsentModal
//         isOpen={showConsentModal}
//         onRequestClose={closeConsentModal}
//         onAgree={handleConsent} // Handle registration after consent is given
//         onDisagree={closeConsentModal} // Close the modal on disagreement
//       />
//     </div>
//   );
// };

// export default SignUp;