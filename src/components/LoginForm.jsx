import {useState} from "react";
import { auth, googleProvider } from "../../functions/firebaseConfig";
import { app as firebaseApp } from "../../functions/firebaseConfig"
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword,
         signInWithPopup, 
       } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState('')
    const db = getFirestore(firebaseApp)
    //const [authing, setAuthing] = useState(false);
    // console.log('this is props', props)

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Sign in
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed in successfully
            setUser(userCredential.user);
            console.log('userCredential', userCredential)
          
            if (userCredential.user && userCredential.user.uid) {
                userProfile();
                props.loggedIn();
                props.setUser(auth.currentUser); 
            }
        })
        .catch((error) => {
            console.log(error);
            // Handle error
        });
    
    
        console.log('this is user', user)
        // Clear the form
        setEmail("");
        setPassword("");
        navigate("/dashboard");
    };

    const signInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
        props.loggedIn();
        props.setUser(auth.currentUser); 
      } catch (error) {
        console.error(error);
      }
    };
  

    const userProfile = async () => {
      if (user && user.uid) { // Check if user is defined and has uid
          const userDataRef = doc(db, "profile", user.uid); // Modify the path as needed
          console.log('this is user', user)
          const userData = await getDoc(userDataRef);
  
          if (userData.exists()) {
              props.setUser(userData.data());
              props.loggedIn();
          }
      }
  };
  
  

    return (
        <div className="container">
          <form className="formContainer" onSubmit={handleSubmit}>
            <h2>Login Form</h2>
            <div className="formElement">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="formElement">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            
              <button type="submit">Login</button>
              <p>or</p>
              <button className="google-signIn-button"onClick={signInWithGoogle}>Sign In With Google</button>
          </form>
          
    </div>
    )
}

export default LoginForm