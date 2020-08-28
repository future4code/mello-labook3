import express from "express";
import { NewsController } from "../controllers/NewsController";

export const newsRouter = express.Router();

const newsController = new NewsController();

newsRouter.get("/feed", newsController.getNews);
newsRouter.get("/:newsId", newsController.getNewsById);

newsRouter.put("/", newsController.createNews);
