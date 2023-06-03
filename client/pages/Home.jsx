import React from 'react';
import { useContext, useEffect } from 'react';
import { UserContext } from '../src/App';
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';

const Home = () => {
  const { token } = useContext(UserContext);
  const [cookie, setCookie, removeCookie] = useCookies(['token']);
  const router = useNavigate();

  useEffect(() => {
    if (!cookie.token) {
      router('/SignIn');
    }
  }, [cookie.token, router]);

  if(!cookie.token){
    return;
  }

  return <div>Home</div>;
};

export default Home;
