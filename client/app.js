import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv/config';

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

import http from 'http';
import { Server } from 'socket.io';
const server = http.createServer(app);
export const io = new Server(server);
import socketIo from './middleware/socketIo.js';
socketIo(io);

import frontpageRouter from './routers/frontpageRouter.js';
import loginRouter from './routers/loginRouter.js';
import userRouter from './routers/userRouter.js';
import documentsRouter from './routers/documentsRouter.js';
import imagesRouter from './routers/imagesRouter.js';
import errorRouter from './routers/errorRouter.js';
import sessionRouter from './routers/sessionRouter.js';
const routers = [frontpageRouter, loginRouter, userRouter, documentsRouter, imagesRouter, sessionRouter, errorRouter];

app.use(routers);
const PORT = process.env.PORT || 8075;
server.listen(PORT, () => console.log('Server is running on port', PORT));
