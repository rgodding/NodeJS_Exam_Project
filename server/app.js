import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv/config';

const app = express();

app.use(express.json());

app.use(
  session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
  })
);

import userRouter from "./routers/userRouter.js"
import documentRouter from "./routers/documentRouter.js"
import collectionRouter from "./routers/collectionRouter.js"
import collectionCategoryRouter from "./routers/collectionCategoryRouter.js"
import imageRouter from "./routers/imageRouter.js"
const routers = [
    userRouter,
    documentRouter,
    collectionRouter,
    collectionCategoryRouter,
    imageRouter,
]
app.use(routers);

const PORT = process.env.PORT || 8081;
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Server running on port - ', PORT);
});
