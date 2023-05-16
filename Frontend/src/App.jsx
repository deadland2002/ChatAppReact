import { useEffect, useState } from "react";
import { socket } from './socket';
import "./App.css";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  useEffect(() => {
    // Add a new event listener for receiving messages
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("message");
    };
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formData.get("msgText");

    socket.emit("message", data);
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
  );
}
export default App;
