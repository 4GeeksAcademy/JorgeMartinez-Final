import React, { useState } from 'react';
import "../../styles/register.css";

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://silver-disco-v7xq97v96rqhpw4r-3000.app.github.dev/api/sign_up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, passwordConfirmation })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle successful sign-up here
      setRegistered(true);
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error here
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='Email' id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='Password' id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirmation">passwordConfirmation</label>
          <input type="password" placeholder='ConfirmPassword' id="passwordConfirmation" name="passwordConfirmation" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {registered && (
        <div className="notification">
          <p>You have been registered successfully!</p>
        </div>
      )}
    </div>
  );
}

export default Register;