import { BaseDatabase } from "./BaseDatabase";
import { User, UserRole } from "../model/User";
import { News } from "../model/News";

export class NewsDatabase extends BaseDatabase {
  private static TABLE_NAME = "LabenewsNews";

  private toModel(dbModel?: any): News | undefined {
    return (
      dbModel &&
      new News(
        dbModel.id,
        dbModel.title,
        dbModel.content,
        this.tinyIntToBoolean(dbModel.is_exclusive)
      )
    );
  }
  
  public async createNews(news: News): Promise<void> {
    await this.getConnection()
      .insert({
        id: news.getId(),
        title: news.getTitle(),
        content: news.getContent(),
        is_exclusive: this.booleanToTinyInt(news.getIsExclusive()),
      })
      .into(NewsDatabase.TABLE_NAME);
  }

  public async getNews(limit: number, offset: number): Promise<News[]> {
    const result = await this.getConnection()
      .select("*")
      .from(NewsDatabase.TABLE_NAME)
      .orderBy("title")
      .limit(limit)
      .offset(offset);

    return result.map((news) => {
      return this.toModel(news);
    }) as News[];
  }

  public async getNotExclusiveNews(
    limit: number,
    offset: number
  ): Promise<News[]> {
    const result = await this.getConnection()
      .select("*")
      .from(NewsDatabase.TABLE_NAME)
      .orderBy("title")
      .limit(limit)
      .offset(offset)
      .where({ is_exclusive: this.booleanToTinyInt(false) });

    return result.map((news) => {
      return this.toModel(news);
    }) as News[];
  }

  public async getNewsById(id: string): Promise<News | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(NewsDatabase.TABLE_NAME)
      .where({ id });

    return this.toModel(result[0]);
  }
}
