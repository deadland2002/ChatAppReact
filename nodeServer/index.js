const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const links = require("./helper/links");
const IO = require("./helper/IO");
const mongoose = require("mongoose");
dotenv.config();

mongoose.connect(process.env.DATABASE_URL).then(()=>{console.log("databse connected")});


user = {};

app.use(cors());
app.use(express.static("../client/dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile("../client/dist/index.html");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Specify the allowed origin
    methods: ["GET", "POST"], // Specify the allowed HTTP methods
    allowedHeaders: ["Access-Control-Allow-Origin"], // Specify the allowed headers
    credentials: true, // Enable CORS credentials
  },
});

links(app);
IO(io);

server.listen(8000, () => {
  console.log("Server running at port 8000");
});
