import React, {useState} from "react";

const HelpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

  }

  return (
    <div className="container">
      <form action="https://formsubmit.co/2aebd82ee1e4cb23853d4fb7e82fc782" method="POST" className="formContainer">
          <h2>Contact Form</h2>
          <div className="formElement">
            <label>Name:</label>
            <input type="text" name="name" required></input>
          </div>
          <div className="formElement">
            <label>Email:</label>
            <input type="email" name="email" required></input>
          </div>
          <div className="formElement">
            <label>Message:</label>
            <textarea name="message" placeholder="Details of your problem"></textarea>
          </div>
          <button type="submit">Send</button>
      </form>
    </div>
    );
}

export default HelpForm