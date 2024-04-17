import React, { useContext, useState, useRef } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import SignUpForm from "./Register";
import { func } from "prop-types";
import { createClient } from "pexels";
import { Navbar } from "./navbar";	
export const Home = () => {
  const { store, actions } = useContext(Context);
  const [input, setInput] = useState("");
  const [img, setImg] = useState("");
  const [btn, setButton] = useState({ disabled: false });

  console.log(input);

  const imgRef = useRef(null);

  const handlerButtonClick = async () => {
    console.log("Funciona");
    if (input === "") {
      alert("Put a value");
      return;
    }

    btn.disabled = true;
    const apiKey = "ben9WYjmqnsmOjJodwrB1ZgZSkjhMrBd1HR7cdEkjULgLJkmk7OPmYkW"; // Reemplaza 'YOUR_API_KEY' con tu clave de API de Pexels

    fetch(`https://api.pexels.com/v1/search?query=${input}`, {
      headers: {
        Authorization: apiKey
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        debugger;
        btn.disabled = false;
        setImg(data.photos[0].src.original);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };

  const downloadImage = () => {
    if (imgRef.current) {
      const imageUrl = imgRef.current.src;
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = "created-image.png";
      a.click();
    }
  };

  return (
    <section className="container">
<div className="card">
        <h1>Image Generator</h1>
        <input
          type="text"
          placeholder="Generacion de Imagenes"
          className="input"
          id="input"
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn" onClick={() => handlerButtonClick()} id="btn">
          Generate
        </button>
        <img className="img" src={img} id="img" ref={imgRef} />
        {img && (
          <div>
            <button className="btn" id="download-btn" onClick={downloadImage}>
              Download
            </button>
            <button className="btn" id="save-btn">
              Save
            </button>
          </div>
        )}
      </div>
    </section>
  );
};