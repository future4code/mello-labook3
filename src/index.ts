import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { userRouter } from "./router/UserRouter";
import { postRouter } from "./router/postRouter";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/post", postRouter);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    server.setTimeout(3000);
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
