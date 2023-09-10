import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios"; //if you don't want to use axios we can use fetchApi
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  const toggleHamburgerMenu = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // now call our api

  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    })();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrrentChat(chat);
  };

  return (
    <Container>
      <div className={`container ${isHamburgerMenuOpen ? "menu-open" : ""}`}>
        {/* <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} /> */}

        <Button>
          <GiHamburgerMenu onClick={toggleHamburgerMenu} />
        </Button>

        {/* Conditionally render Contacts component */}
        {isHamburgerMenuOpen && <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />}

        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 15% 75%;
    &.menu-open {
      grid-template-columns: 100%;
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }

    @media screen and (min-width: 360px) and (max-width: 480px) {
      grid-template-columns: 19% 71%;
    }
  }
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  width: 120px;
  @media screen and (min-width: 360px) and (max-width: 480px) {
    margin-top: 20px;
    margin-left: 15px;
    width: 50px;
    height: 50px;
  }
  /* height: 120px; */
  svg {
    /* width: 25rem; */
    font-size: 3rem;
    color: white;
  }
`;
