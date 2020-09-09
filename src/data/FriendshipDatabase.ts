import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { Friendship } from "../model/Friendship";

export class FriendshipDatabase extends BaseDatabase {
  private static TABLE_NAME = "friendship";

  private toModel(dbModel?: any): User | undefined {
    return (
      dbModel &&
      new User(dbModel.id, dbModel.name, dbModel.email, dbModel.password)
    );
  }

  public async createFriendship(friendship: Friendship): Promise<void> {
    await this.getConnection()
      .insert({
        id: friendship.getId(),
        user_id: friendship.getUserId(),
        friend_id: friendship.getFriendId(),
      })
      .into(FriendsDatabase.TABLE_NAME);
  }

  public async getUserById(id: string): Promise<User | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(FriendsDatabase.TABLE_NAME)
      .where({ id });

    return this.toModel(result[0]);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(FriendsDatabase.TABLE_NAME)
      .where({ email });

    return this.toModel(result[0]);
  }

  public async getAllUsers(): Promise<User[]> {
    const result = await this.getConnection()
      .select("*")
      .from(FriendsDatabase.TABLE_NAME);

    return result.map((item: any) => {
      return this.toModel(item);
    }) as User[];
  }
}
