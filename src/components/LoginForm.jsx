import React,{useState} from "react";
import { app as firebaseApp } from "../../functions/firebaseConfig"
import { getAuth, 
         signOut,
         signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authing, setAuthing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // You can add your authentication logic here
        // For this example, let's just log the values to the console
        console.log("Email:", email);
        console.log("Password:", password);
        // Sign in
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User signed in successfully
                var user = userCredential.user;
                console.log(user)
                setAuthing(true);

            })
            .catch((error) => {
                setAuthing(false);
                console.log(error)
                // Handle error
            });

        // Clear the form
        setEmail("");
        setPassword("");
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
            
          </form>
    </div>
    )
}

export default LoginForm