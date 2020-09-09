import express from "express";
import { UserController } from "../controllers/UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", new UserController().signup);
userRouter.post("/login", userController.login);
