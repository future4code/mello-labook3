import express from "express";
import { UserController } from "../controllers/UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.get("/all", new UserController().getAllUsers);

userRouter.post("/signup", new UserController().signup);
userRouter.post("/login", userController.login);

userRouter.post(
  "/turnUserIntoSubscriber",
  userController.turnUserIntoSubscriber
);
