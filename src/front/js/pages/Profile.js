import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
  const { store, actions } = useContext(Context);

  // Check if the user is authenticated
  if (!store.isAuthenticated) {
    // Redirect the user to the login page or show a message
    return <p>Please log in to view your profile.</p>;
  }

  // State to hold the new password
  const [newPassword, setNewPassword] = useState('');// Function to handle changing the password
  const handleChangePassword = () => {
    const opts = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${store.token}`
      },
      body: JSON.stringify(
        {
          "password": newPassword
        })
    }
    fetch('https://silver-disco-v7xq97v96rqhpw4r-3000.app.github.dev/api/token', opts)
      .then(response => {
        if(response.status === 200)
          return response.json();
        else
          alert("There was an error changing the password");
      })
      .then(data => {
        // Handle successful password change here, e.g. show a message or redirect to another page
        console.log("Password changed successfully", data);
      })
      .catch(error => { 
        console.error("There was an error", error);
      })
  }

  // Display the user's profile information
  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {store.user.email}</p>

      {/* Input field for new password */}
      <input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

      {/* Button to submit password change */}
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};