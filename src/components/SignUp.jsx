import React, { useState } from 'react';
import { app as firebaseApp } from "../../functions/firebaseConfig"
import {createUserWithEmailAndPassword,
        getAuth,
       } from 'firebase/auth';

const SignUp = () => {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      {error && <p>{error}</p>}
      <form  className="formContainer" onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <div className="formElement">  
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="formElement">  
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;