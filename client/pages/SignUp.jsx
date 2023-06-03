import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignUp.scss";
import { UserContext } from "../src/App";
import { useContext } from "react";
import axios from "axios";

const SignUp = () => {
  const [values, setValues] = useState({ email: "", password: "", name: "" });
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
    errorRef.current.innerText = "";
    
    const response = await axios.post("http://localhost:8000/SignUp", values);
    await new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 1000);
    });
    if (response.data && !response.data.error) {
      successRef.current.classList.remove("loading");
      successRef.current.classList.add("success");
      await new Promise((res, rej) => {
        setTimeout(() => {
          res();
        }, 1000);
      });

      router("/SignIn");
    } else if (response.data) {
      errorRef.current.innerText = response.data.message;
    } else {
      errorRef.current.innerText = "error occured";
    }
    successRef.current.classList.remove("loading");
  };
  return (
    <div className="SignUpParent">
      <div className="wrapper">
        <div className="header">
          <img src="/png/logo.png" alt="" />
          <span>ChatX</span>
        </div>
        <form className="container" onSubmit={HandleSubmit}>
          <span className="bold">Sign up</span>
          <span>create your account</span>
          <div className="fields">
            <input
              type="text"
              name="name"
              placeholder="name"
              onChange={HandleChange}
              required
            />
            <img src="/png/profile.png" alt="" />
          </div>
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
              <button>Sign up</button>
            </div>
          </div>
        </form>
        <div className="footer">
          <span>Already have an account? </span>
          <Link to={"/SignIn"}> Signin </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
