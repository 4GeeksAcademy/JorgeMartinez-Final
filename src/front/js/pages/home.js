import React, { useContext, useState, useRef } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import SignUpForm from "./Register";
import { func } from "prop-types";
import { createClient } from "pexels";
import { Navbar } from "../component/navbar";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from "react-share";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [input, setInput] = useState("");
  const [img, setImg] = useState("");
  const [btn, setButton] = useState({ disabled: false });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  console.log(input);

  const imgRef = useRef(null);

  const handlerButtonClick = async () => {
    console.log("Funciona");
    if (input === "") {
      alert("Put a value");
      return;
    }

    btn.disabled = true;
    const apiKey = "ben9WYjmqnsmOjJodwrB1ZgZSkjhMrBd1HR7cdEkjULgLJkmk7OPmYkW"; 

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          <div className="share-download-container">
            <button className="btn" id="download-btn" onClick={downloadImage}>
              Download
            </button>
            <button className="btn" id="save-btn" onClick={() => {}}>
              Save
            </button>
            <button className="btn" id="share-btn" onClick={toggleDropdown}>
              Share
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <FacebookShareButton url={img}>
                  <i className="fab fa-facebook-f"></i> Facebook
                </FacebookShareButton>
                <TwitterShareButton url={img}>
                  <i className="fab fa-twitter"></i> Twitter
                </TwitterShareButton>
                <LinkedinShareButton url={img}>
                  <i className="fab fa-linkedin-in"></i> LinkedIn
                </LinkedinShareButton>
                <WhatsappShareButton url={img}>
                  <i className="fab fa-whatsapp"></i> WhatsApp
                </WhatsappShareButton>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};