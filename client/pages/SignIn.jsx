import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SignIn.scss";
import { UserContext } from "../src/App";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const SignIn = () => {
  const { setToken } = useContext(UserContext);
  const [cookie,setCookie,removeCookie] = useCookies(["token"])
  const [values, setValues] = useState({ email: "", password: "" });
  const errorRef = useRef();
  const successRef = useRef();
  const router = useNavigate();

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const HandleSubmit = async (e) => {
    
    e.preventDefault();
    successRef.current.classList.add("loading");
    
    const response = await axios.post("http://localhost:8000/SignIn", values);
    
    await new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 1000);
    });
    
    if (response.data && !response.data.error) {
      successRef.current.classList.remove("loading");
      successRef.current.classList.add("success");
      setToken(response.data.message);
      setCookie("token",response.data.message);
      
      await new Promise((res, rej) => {
        setTimeout(() => {
          res();
        }, 1000);
      });

      router("/");
      console.log("ok");

    } else if (response.data) {
      errorRef.current.innerText = response.data.message;
    } else {
      errorRef.current.innerText = "error occured";
    }
    successRef.current.classList.remove("loading");
    console.log(response);
  };
  return (
    <div className="SignInParent">
      <div className="wrapper">
        <div className="header">
          <img src="/png/logo.png" alt="" />
          <span>ChatX</span>
        </div>
        <form className="container" onSubmit={HandleSubmit}>
          <span className="bold">Sign in</span>
          <span>Login to your account</span>
          <div className="fields">
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={HandleChange}
              required
            />
            <img src="/png/email.png" alt="" />
          </div>
          <div className="fields">
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={HandleChange}
              required
            />
            <img src="/png/key.png" alt="" />
          </div>
          <span ref={errorRef} className="errorSpan"></span>
          <div className="btnDiv">
            <div ref={successRef}>
              <span></span>
              <button>Sign in</button>
            </div>
          </div>
        </form>
        <div className="footer">
          <span>Dont have an account?</span> <Link to={"/SignUp"}>Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
