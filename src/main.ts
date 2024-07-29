import dotenv from 'dotenv';
dotenv.config();

import bodyParser from "body-parser";
import express from "express";

import { config } from "./config";
import { userRouter } from './user/infrastructure/routes/user-router';
import { productRouter } from './products/infrastructure/routes/productRouter';

function boostrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use("/users", userRouter);
  app.use("/products", productRouter);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
