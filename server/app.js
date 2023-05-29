import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv/config';
const app = express();

app.use(
  session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8075');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

import documentRouter from './routers/documentRouter.js';
import collectionRouter from './routers/collectionRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import imageRouter from './routers/imageRouter.js';
import loginRouter from './routers/loginRouter.js';
const routers = [loginRouter, documentRouter, collectionRouter, categoryRouter, imageRouter];
app.use(routers);

const PORT = process.env.PORT || 8081;
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Server running on port - ', PORT);
});
