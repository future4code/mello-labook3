import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { userRouter } from "./router/UserRouter";
import { newsRouter } from "./router/NewsRouter";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/news", newsRouter);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    server.setTimeout(3000);
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
