const express = require("express");
const { Server } = require("socket.io");
const app = express();
app.use(express.static("public"));

app.get("/", (response) => {
  response.sendFile("/index.html");
});

const server = app.listen(
  process.env.PORT || 3000,
  console.log("Server Started...")
);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(socket.id + " Connected");
  io.emit("traffic", "New User Joined Chat");
  socket.on("disconnect", () => {
    console.log(socket.id + " Disconnected");
    io.emit("traffic", "A User Left the Chat");
  });

  socket.on("message", (data) => {
    io.emit("message", data);
  });
});
