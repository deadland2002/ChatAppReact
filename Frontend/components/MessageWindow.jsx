import React, { useEffect, useState } from 'react'

export const MessageWindow = ({SocketIO}) => {
    const [isConnected, setIsConnected] = useState(SocketIO.connected);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    SocketIO.on('connect', onConnect);
    SocketIO.on('disconnect', onDisconnect);

    return () => {
      SocketIO.off('connect', onConnect);
      SocketIO.off('disconnect', onDisconnect);
    };
  }, []);

  useEffect(() => {
    // Add a new event listener for receiving messages
    SocketIO.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      SocketIO.off("message");
    };
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formData.get("msgText");

    SocketIO.emit("message", data);
    e.target.reset(); // Reset the form input
  }
  return (
    <>
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input id="input" name="msgText" />
        <button>Send</button>
      </form>
    </>
  )
}
