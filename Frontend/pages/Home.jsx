import React from 'react'
import { MessageWindow } from '../components'
import { socket } from '../src/socket'

const Home = () => {
  console.log(socket)
  return (
    <MessageWindow SocketIO={socket}/>
  )
}

export default Home