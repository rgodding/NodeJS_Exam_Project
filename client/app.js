/*
import express from "express";
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

import http from "http";

import { Server } from "socket.io"
const server = http.createServer(app);
const io = new Server(server);

import frontpageSocket from "./middleware/socketio/frontpageSocket.js";
import documentsSocket from "./middleware/socketio/documentsSocket.js";
frontpageSocket(io);
documentsSocket(io);


import frontpageRouter from "./routers/frontpageRouter.js"
import documentsRouter from "./routers/documentsRouter.js"
const routers = [
    frontpageRouter,
    documentsRouter,
]
app.use(routers);

const PORT = process.env.PORT || 8080;
server.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Server running on port - ', PORT);
});
*/

/*
import express from "express";
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

io.on("connection", (socket) => {
  console.log('A client connected', socket.id)

  socket.on("client choose a color", (data) => {
      io.emit("a color was chosen", data); 
  })
})


import frontpageRouter from "./routers/frontpageRouter.js"
import documentsRouter from "./routers/documentsRouter.js"
const routers = [
    frontpageRouter,
    documentsRouter,
]

app.use(routers);
const PORT = process.env.PORT || 8075;
server.listen(PORT, () => console.log("Server is running on port", PORT));
*/

import express from "express";
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
import http from "http";
import { Server } from "socket.io";
const server = http.createServer(app);
export const io = new Server(server);

import frontpageRouter from "./routers/frontpageRouter.js"
import documentsRouter from "./routers/documentsRouter.js"
import socketIo from "./middleware/socketIo.js";
const routers = [
    frontpageRouter,
    documentsRouter,
]

socketIo(io)

app.use(routers);
const PORT = process.env.PORT || 8075;
server.listen(PORT, () => console.log("Server is running on port", PORT));