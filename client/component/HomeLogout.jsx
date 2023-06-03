import React from "react";
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom"

const HomeLogout = () => {
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const router = useNavigate();

    const HandleLogout = () =>{
        setCookie("token","",{maxAge:-1})
        removeCookie("token");
        router("/SignIn");
    }
  return (
    <div className="logoutParent">
      <span onClick={HandleLogout}>
        <img src="/png/logout.png" />
      </span>
    </div>
  );
};

export default HomeLogout;
