import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import axios from "axios";
import HomeChats from "../component/HomeChats";
import HomeMessage from "../component/HomeMessage";
import "../styles/Home.scss";
import HomeHeader from "../component/HomeHeader";
import { socket } from "../src/socket";

const Home = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const baseUrl = import.meta.env.VITE_BASE_URL || "";

  const { isLoading, error, data } = useQuery("FetchHome", async () => {
    const result = await axios.post(baseUrl+"/account/getdata", {
      token: cookie.token,
    });
    return result.data;
  });
  const [currMessage, setCurrMessage] = useState();
  const [messages, setMessages] = useState({});
  const [otherUser, setOtherUser] = useState({name:"",email:""});

  const router = useNavigate();

  useEffect(() => {
    if (!cookie.token) {
      router("/SignIn");
    }
  }, [cookie.token, router]);

  useEffect(() => {
    if (!data?.error) {
      socket.connect();
    }
  }, [data]);

  if (!cookie.token) {
    return;
  }
  if (isLoading) return "Loading...";

  if (error || data.error) return "An error has occurred: " + error;

  return (
    <div className="HomeParent">
      <div className="header">
        <HomeHeader
          requestList={data.message.requests}
          username={data.message.username}
        />
      </div>
      <div className="viewarea">
        <HomeChats
          friendList={data.message.friends}
          setCurrMessage={setCurrMessage}
          setMessages={setMessages}
          setOtherUser={setOtherUser}
        />
        <HomeMessage
          currMessage={currMessage}
          userEmail={data.message.email}
          messages={messages}
          setMessages={setMessages}
          otherUser = {otherUser}
        />
      </div>
    </div>
  );
};

export default Home;
