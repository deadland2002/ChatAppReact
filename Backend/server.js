const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({
    origin:"http://localhost:5173"
}));

app.use(express.static("../Frontend/dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Specify the allowed origin
    methods: ["GET", "POST"], // Specify the allowed HTTP methods
    allowedHeaders: ["Access-Control-Allow-Origin"], // Specify the allowed headers
    credentials: true // Enable CORS credentials
  }
});

app.get("/", function (req, res) {
  res.sendFile("../Frontend/dist/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message",(msg)=>{
    console.log(msg);
    io.emit("message",msg);
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(2000, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server running on port 2000");
    console.log("%s", "http://localhost:2000");
  }
});
