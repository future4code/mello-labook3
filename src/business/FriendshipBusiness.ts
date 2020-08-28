import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { User } from "../model/User";
import { Authenticator } from "../services/Authenticator";

export class UserBusiness {
  public async login(userId: string, friendId: string) {
    const userDb = new UserDatabase();
    const user = await userDb.getUserById(userId);
    const friend = await userDb.getUserById(friendId);

    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = new Authenticator().generateToken({
      id: user.getId(),
      email: user.getEmail(),
    });

    return { id: user.getId(), accessToken };
  }
}
