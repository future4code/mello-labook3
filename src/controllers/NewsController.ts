import { Request, Response } from "express";
import { NewsBusiness } from "../business/NewsBusiness";
import { Authenticator } from "../services/Authenticator";
import { UserRole } from "../model/User";
import { BaseDatabase } from "../data/BaseDatabase";

export class NewsController {
  public async createNews(req: Request, res: Response) {
    try {
      const userData = new Authenticator().getData(
        req.headers.authorization as string
      );

      if (userData.role !== UserRole.ADMIN) {
        throw new Error("Unauthorized");
      }

      await new NewsBusiness().createNews(
        req.body.title,
        req.body.content,
        req.body.isExclusive
      );
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }

  public async getNews(req: Request, res: Response) {
    try {
      const authenticator = new Authenticator();
      const userData = authenticator.getData(
        req.headers.authorization as string
      );

      const result = await new NewsBusiness().getNews(
        userData.role,
        req.query.page as any
      );
      res.status(200).send(result.news.map(singleNew=>{
        return {id : singleNew.getId(),
                title: singleNew.getTitle()}
      }));
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }

  public async getNewsById(req: Request, res: Response) {
    try {
      new Authenticator().getData(req.headers.authorization as string);

      const result = await new NewsBusiness().getNewsById(req.params.newsId);

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }
}
