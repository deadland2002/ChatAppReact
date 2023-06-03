import React from "react";
import { socket } from "../src/socket";

const HomeChats = ({ friendList , setCurrMessage, setMessages , setOtherUser }) => {
  const LoadChats = async (room_id,name,email) =>{
    await socket.emit("connectRoom",room_id);
    await socket.emit("initiate","true");
    setOtherUser({name:name,email:email});
    setMessages({});
  }
  return (
    <div className="leftParent">
      <div className="wrapper">
        <ul className="chatNames">{friendList.map((single,index) => {
          return(
            <li key={`historyChat${index}`} onClick={()=>{LoadChats(single.room_id,single.name,single.email)}}>
                <span>{single.name}</span>
                <span>{single.email}</span>
            </li>
          )
        })}</ul>
      </div>
    </div>
  );
};

export default HomeChats;
