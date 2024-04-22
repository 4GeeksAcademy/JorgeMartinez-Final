import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = sessionStorage.getItem("token");
    console.log("This is your token", token);

    const handleClick = () => {
        const opts = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {

                    "email": email,
                    "password": password

                })

        };
        fetch('https://silver-disco-v7xq97v96rqhpw4r-3001.app.github.dev/api/token', opts)
            .then(response => {
                if (response.status === 200)
                    return response.json();
                else alert("Faltan datos por rellenar")
            })
            .then(data => {
                sessionStorage.setItem("token", data.acces_token);
            })
            .catch(error => {
                console.error("There was an error", error);
            })
    }


    return (
        <div className="text-center mt-5">
            <h1>Login</h1>
            
                {(token && token!="" && token!=undefined) ? ("You are logged in with this token" + token ):  
                (
                <div>
            
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleClick}>Login</button>
            </div>
        )}
       
        </div>
        
    );
};
