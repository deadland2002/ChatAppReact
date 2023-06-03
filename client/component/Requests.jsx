import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { HandlePopup } from "./NotifinationHttp";

const Requests = ({ requestList }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [isOpen, setIsOpen] = useState(false);
  const [mount, setMount] = useState();

  const HandleAccept = async (email) => {
    if (!email) {
      return;
    } else {
      const data = {
        token: cookie.token,
        email: email,
      };
      const result = await axios.post(
        "http://localhost:8000/account/AcceptFriend",
        data
      );
      if (result && result.data) {
        
        if (!result.data.error) {
          setValue("");
        }
        await HandlePopup(
          3000,
          result.data.message,
          result.data.response_code,
          setMount
        );
      }
    }
  };

  return (
    <div className="requestParent">
      {mount}
      <div className="wrapper">
        <div
          className="imgWrapper"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <img src="/png/friends.png" />
        </div>
        <ul className={`popup ${isOpen ? "open" : ""}`}>
          {requestList?.length >= 1
            ? requestList.map((single, index) => {
                return (
                  <li key={`alerts${index}`}>
                    <div className="details">
                      <span>{single.name}</span>
                      <span>{single.email}</span>
                    </div>
                    <div className="add">
                      <button
                        onClick={() => {
                          HandleAccept(single.email);
                        }}
                      >
                        <img src="/png/tick-green.png" alt="" />
                      </button>
                    </div>
                  </li>
                );
              })
            : [
              <li key={"noRequests"}><div className="details">
              <span>No requests</span>
            </div></li>
            ]}
        </ul>
      </div>
    </div>
  );
};

export default Requests;
