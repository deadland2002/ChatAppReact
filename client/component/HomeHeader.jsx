import React from 'react'
import AddUser from './AddUser'
import Requests from './Requests'
import { useCookies } from "react-cookie";
import HomeLogout from './HomeLogout';

const HomeHeader = ({requestList,username}) => {
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  return (
    <div className="headerparent">
        <div className='left'>
            Welcome , {username}
        </div>
        <div className="right">
            <AddUser token={cookie.token} />
            <Requests requestList={requestList} />
            <HomeLogout />
            
        </div>
    </div>
  )
}

export default HomeHeader