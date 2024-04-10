import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label><br />
      <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} required /><br />
      <label htmlFor="password">Password:</label><br />
      <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required /><br />
      <label htmlFor="passwordConfirmation">ConfirmPassword:</label><br />
      <input type="password" id="passwordConfirmation" name="passwordConfirmation" value={passwordConfirmation} onChange={(event) => setPassword(event.target.value)} required /><br />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Register;