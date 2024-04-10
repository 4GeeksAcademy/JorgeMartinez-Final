import React, { useState } from 'react';
import "../../styles/register.css";


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://silver-disco-v7xq97v96rqhpw4r-3001.app.github.dev/api/sign_up', {
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
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error here
    });
  }

  return (
    <form onSubmit={handleSubmit} className="sign-up-form">
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirmation">passwordConfirmation</label>
        <input type="password" id="passwordConfirmation" name="passwordConfirmation" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Register;