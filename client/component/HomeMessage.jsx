import React, { useEffect, useRef, useState } from "react";
import { socket } from "../src/socket";
import { useCookies } from "react-cookie";

const HomeMessage = ({ currMessage, userEmail , messages, setMessages , otherUser }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [value, setValue] = useState("");
  const myDivRef = useRef(null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("recieve message", (value) => {
      setMessages((prev) => ({
        ...prev,
        [value["_id"]]: {
          sender: value.sender,
          message: value.message,
          date: value.date,
        },
      }));
    });
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);


  useEffect(()=>{
    if (myDivRef.current) {
      myDivRef.current.scrollTop = myDivRef.current.scrollHeight;
    }
  },[messages]);

  const HandleChange = (e) => {
    setValue(e.target.value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send message", cookie.token, value);
    setValue("");
  };

  return (
    <div className="rightParent">
      <div className="wrapper">
        <div className="messageHeader">
          <div className="wrapperHead">
            <span>{otherUser.name}</span>
            {/* <span>{otherUser.email}</span> */}
          </div>
        </div>
        <div className="messageWindow" ref={myDivRef}>
          {Object.keys(messages).map((key) => {
            return (
              <>
                <div className={`messageWrapper`} key={key}>
                  <div
                    className={`container ${
                      messages[key].sender == userEmail ? "right" : "left"
                    }`}
                  >
                    <div className="message" key={`${key}_message`}>{messages[key].message}</div>
                    <div className={'dateTimeWrapper'}>
                      <div className="date" key={`${key}_date`}>
                        Date : {String(messages[key].date).split("T")[0]}
                      </div>
                      <div className="time" key={`${key}_time`}>
                        Time :{" "}
                        {String(messages[key].date).split("T")[1].split(".")[0]}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <form className="inputDiv" onSubmit={HandleSubmit}>
          <input type="text" onChange={HandleChange} value={value} required/>
          <button >click</button>
        </form>
      </div>
    </div>
  );
};

export default HomeMessage;
