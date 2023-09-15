import { useState } from 'react';
import { app as firebaseApp } from "../../functions/firebaseConfig"
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { updateProfile } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification
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
  const [user, setUser] = useState(null);
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();

  const openConsentModal = () => {
    setShowConsentModal(true);
  };

  const closeConsentModal = () => {
    setShowConsentModal(false);
  };

  const handleConsent = () => {
    setUserConsent(true); 
    closeConsentModal();
    handleSignUp();
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(auth.currentUser);
      console.log('Email verification sent successfully');
      console.log('this is emailVerified', user.emailVerified)

      // Update user profile
      await updateProfile(user, {
        displayName: name
      });

      console.log('Display name set successfully');

      props.setUser(user);

      setError('');
      navigate('/');
      window.alert('Sign up successful! Please check your email for a verification link.');
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




