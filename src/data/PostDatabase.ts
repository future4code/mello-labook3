import { BaseDatabase } from "./BaseDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class PostDatabase extends BaseDatabase {
  static TABLE_NAME: string = "Labook_Posts";

  public async createPost(
    id: string,
    picture: string,
    description: string,
    creation_date: Date,
    creator_id: string,
    type: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          picture,
          description,
          creation_date,
          creator_id,
          type,
        })
        .into(PostDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserById(id: string) {
    const result = await this.getConnection().raw(`
        SELECT * FROM User_arq
        WHERE id = "${id}"
        `);

    const data = result[0][0];
    console.log(data);
    if (data.is_approved === 0) {
      throw new Error("Usuário não aprovado");
    }

    return data;
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      await this.getConnection()
        .where({ id })
        .from(PostDatabase.TABLE_NAME)
        .del();
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async get(): Promise<any[]> {
    try {
      const users: any = [];

      const result = await this.getConnection()
        .select("*")
        .from(PostDatabase.TABLE_NAME);

      for (let user of result) {
        users.push(user);
      }

      return users;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
