import express from "express";
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

import http from "http";
import { Server } from "socket.io";
const server = http.createServer(app);
export const io = new Server(server);
import socketIo from "./middleware/socketIo.js";
socketIo(io)

import frontpageRouter from "./routers/frontpageRouter.js"
import loginRouter from "./routers/loginRouter.js"
import adminRouter from "./routers/adminRouter.js"
import documentsRouter from "./routers/documentsRouter.js"
import imagesRouter from "./routers/imagesRouter.js"
const routers = [
    frontpageRouter,
    loginRouter,
    adminRouter,
    documentsRouter,
    imagesRouter,
]



app.use(routers);
const PORT = process.env.PORT || 8075;
server.listen(PORT, () => console.log("Server is running on port", PORT));