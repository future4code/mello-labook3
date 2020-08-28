import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      const result = await new UserBusiness().signup(
        req.body.name,
        req.body.email,
        req.body.password
      );
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }

  public async login(req: Request, res: Response) {
    try {
      console.log("email", req.body.email);
      console.log("senha", req.body.password);

      const result = await new UserBusiness().login(
        req.body.email,
        req.body.password
      );

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }
}
