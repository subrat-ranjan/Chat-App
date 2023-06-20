import React, { useState, useEffect } from "react";
import styled from "styled-components";
import loader from "../assets/load.gif";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

export default function SetAvatar1() {
  // const api = "https://api.multiavatar.com/45678945";
  const api = "https://api.multiavatar.com/Binx Bond";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [selectedAvatar, setselectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoclose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  //if there is no user in the localstorage then navigate to login.
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
    console.log("peew");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an Avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      console.log(data);
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }
  };
  // useEffect(async () => {
  //   const data = [];
  //   for (let i = 0; i < 4; i++) {
  //     const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
  //     const buffer = new Buffer(image.data);
  //     data.push(buffer.toString("base64")); //convert the data to base 64 string.
  //   }
  //   setAvatars(data);
  //   setisLoading(false);
  // }, []);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=ab8RJehZDv4Ycw`);

        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
        // ...
        // console.log(image.response.data);
      }
      setAvatars(data);
      setisLoading(false);
    }
    // console.log("hagura");
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                  <img src={`data:image/svg+xml;base64, ${avatar}`} alt="avatar" onClick={() => setselectedAvatar(index)} />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            SET PROFILE PICTURE
          </button>
        </Container>
      )}
      ;
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      transition: o.5s ease-in-out;
      img {
        height: 6rem;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;

    &:hover {
      background-color: #4e0eff;
    }
  }
`;
