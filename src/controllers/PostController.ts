import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { PostDatabase } from "../data/PostDatabase";

export class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const authenticator = new Authenticator();
      const authenticationData = authenticator.getData(token);
      const creatorId = authenticationData.id;

      const idGenerator = new IdGenerator();
      const postId = idGenerator.generate();

      const { picture, description, type } = req.body;
      const creationDate = new Date();

      const postDatabase = new PostDatabase();
      await postDatabase.createPost(
        postId,
        picture,
        description,
        creationDate,
        creatorId,
        type
      );
      res.status(200).send({
        message: "Post criado com sucesso",
      });
    } catch (e) {
      res.status(400).send({
        message: e.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }
}
