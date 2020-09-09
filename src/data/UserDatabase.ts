import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "friendship";

  private toModel(dbModel?: any): User | undefined {
    return (
      dbModel &&
      new User(dbModel.id, dbModel.name, dbModel.email, dbModel.password)
    );
  }

  public async createUser(user: User): Promise<void> {
    await this.getConnection()
      .insert({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async getUserById(id: string): Promise<User | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

    return this.toModel(result[0]);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return this.toModel(result[0]);
  }
}
