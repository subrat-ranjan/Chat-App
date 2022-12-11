import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; //if you don't want to use axios we can use fetchApi
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
    fetchData();
  }, []);

  // now call our api

  // useEffect(async () => {
  //   if (currentUser) {
  //     if (currentUser.isAvatarimageSet) {
  //       const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //       setContacts(data.data);
  //     } else {
  //       navigate("/setAvatar");
  //     }
  //   }
  // }, [currentUser]);

  // useEffect(() => {
  //   (async () => {
  //     if (currentUser) {
  //       if (currentUser.isAvatarimageSet) {
  //         const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //         setContacts(data.data);
  //         navigate("/");
  //       } else {
  //         navigate("/setAvatar");
  //       }
  //     }
  //   })();
  // }, [currentUser]);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    async function fetchData() {
      // console.log(currentUser.isAvatarimageSet);
      if (currentUser) {
        if (currentUser.isAvatarimageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          console.log(data);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    setTimeout(() => {
      fetchData();
    }, 500);
  }, [currentUser]);

  // useEffect(() => {
  //   (async function () {
  //     if (currentUser) {
  //       if (currentUser.isAvatarimageSet) {
  //         const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //         setContacts(data.data);
  //       } else {
  //         navigate("/setAvatar");
  //       }
  //     }
  //   })();
  // }, [currentUser]);

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} />
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
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-widt: 1080px) {
      grid-template-columns: 35% 65%;
    }

    @media screen and (min-width: 360px) and (max-widt: 480px) {
      grid-template-columns: 30% 60%;
    }
  }
`;
