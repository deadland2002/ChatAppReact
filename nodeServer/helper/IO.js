const IO = (io) => {
  io.on("connection", (socket) => {
    console.log("New user joined having id ${socket.id}");

    socket.on("userName", (uName) => {
      console.log(`Received name: ${uName}`);
      user[socket.id] = uName;
      socket.emit("nameReceived", uName);
    });

    socket.on("disconnect", (id) => {
      console.log("disconnected", user[socket.id]);
    });

    socket.on("send message", (content) => {
      io.emit("send message", content);
      console.log(content);
    });
  });
};

module.exports = IO;
