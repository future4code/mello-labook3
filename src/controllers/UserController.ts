import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { Authenticator } from "../services/Authenticator";
import { UserRole, User } from "../model/User";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
  
  async signup(req: Request, res: Response) {
    try {
      const result = await new UserBusiness().signup(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.role
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

  public async getAllUsers(req: Request, res: Response) {
    try {
      const userData = new Authenticator().getData(
        req.headers.authorization as string
      );

      if (userData.role !== UserRole.ADMIN) {
        throw new Error("Unauhtorized");
      }

      const users = await new UserBusiness().getAllUsers();
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }

    await BaseDatabase.destroyConnection();
  }

  public async turnUserIntoSubscriber(req: Request, res: Response) {
    try {
      const userData = new Authenticator().getData(
        req.headers.authorization as string
      );

      if (userData.role !== UserRole.ADMIN) {
        throw new Error("Unauhtorized");
      }

      await new UserBusiness().turnUserIntoSubscriber(req.body.userId);
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }
}
