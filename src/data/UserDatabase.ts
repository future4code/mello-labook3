import { BaseDatabase } from "./BaseDatabase";
import { User, UserRole } from "../model/User";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "LabenewsUser";

  private toModel(dbModel?: any): User | undefined {
    return (
      dbModel &&
      new User(
        dbModel.id,
        dbModel.name,
        dbModel.email,
        dbModel.password,
        dbModel.role
      )
    );
  }
  
  public async createUser(user: User): Promise<void> {
    await this.getConnection()
      .insert({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole(),
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

  public async getAllUsers(): Promise<User[]> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME);

    return result.map((item: any) => {
      return this.toModel(item);
    }) as User[];
  }

  public async changeUserRole(id: string, role: UserRole): Promise<void> {
    await this.getConnection()
      .from(UserDatabase.TABLE_NAME)
      .update({
        role,
      })
      .where({ id });
  }
}
