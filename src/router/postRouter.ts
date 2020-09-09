import express from "express";
import { PostController } from "../controllers/PostController";

export const postRouter = express.Router();

const postController = new PostController();

postRouter.post("/", postController.createPost);
