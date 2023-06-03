const ChatSchema = require("../schema/ChatSchema");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET = process.env.JWT_SECRET;

rooms = {};

const IO = (io) => {
  io.on("connection", (socket) => {
    console.log(`New user joined having id ${socket.id}`);

    socket.on("userName", (uName) => {
      console.log(`Received name: ${uName}`);
      user[socket.id] = uName;
      socket.emit("nameReceived", uName);
    });

    socket.on("disconnect", (id) => {
      console.log("disconnected", rooms[socket.id]);
    });

    socket.on("send message", async (token, content) => {
      const userObj = await JWT.verify(token, SECRET);
      var dt = new Date(Date.now());
      const messages = await ChatSchema.updateOne(
        { id: rooms[socket.id] },
        { $push: { messages: { sender: userObj.email, message: content } } }
      );
      const data = {
        sender: userObj.email,
        message: content,
        date: dt.toISOString(),
        _id: `${token}_${dt}_${userObj.email}`,
      };
      io.to(rooms[socket.id]).emit("recieve message", data);
    });

    socket.on("initiate", async (content) => {
      const messages = await ChatSchema.findOne({ id: rooms[socket.id] });
      for (var i of messages.messages) {
        io.to(rooms[socket.id]).emit("recieve message", i);
      }
    });

    socket.on("connectRoom", (content) => {
      console.log(content);
      socket.join(content);
      rooms[socket.id] = content;
    });
  });
};

module.exports = IO;
