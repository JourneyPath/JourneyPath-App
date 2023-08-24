import {useState} from "react";
import { app as firebaseApp } from "../../functions/firebaseConfig"
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth,
         signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = (props) => {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState('')
    const db = getFirestore(firebaseApp)
    //const [authing, setAuthing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Sign in
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User signed in successfully
                setUser(userCredential.user);
                console.log("user",user,userCredential.uid)
                //setAuthing(true);
                if (user && user.uid) {
                  userProfile()
                }
            })
            .catch((error) => {
                //setAuthing(false);
                console.log(error)
                // Handle error
            });

        // Clear the form
        setEmail("");
        setPassword("");
    };

    const userProfile = async () => {
      const userDataRef = doc(db, user.uid, "profile")
      const userData = await getDoc(userDataRef)
        if (userData.exists()) {
          props.setUser(userData.data())
          props.loggedIn()
        }
    }

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
            
          </form>
    </div>
    )
}

export default LoginForm