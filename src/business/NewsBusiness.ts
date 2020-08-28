import { NewsDatabase } from "../data/NewsDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { User, toUserRole, UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { News } from "../model/News";

export class NewsBusiness {
  private static NEWS_LIMIT = 5;

  public async createNews(
    title: string,
    content: string,
    isExclusive: boolean
  ) {
    if (!title) {
      throw new Error("Invalid title");
    }

    if (!content) {
      throw new Error("Invalid content");
    }

    const id = new IdGenerator().generate();

    const newsDb = new NewsDatabase();

    const news = new News(id, title, content, isExclusive);

    await newsDb.createNews(news);
  }

  public async getNews(userRole: UserRole, page: number) {
    let news: News[] = [];
    const offset = (page - 1) * NewsBusiness.NEWS_LIMIT;
    const newsDb = new NewsDatabase();
    if (userRole === UserRole.ADMIN || userRole === UserRole.SUBSCRIBER) {
      news = await newsDb.getNews(NewsBusiness.NEWS_LIMIT, offset);
    } else {
      news = await newsDb.getNotExclusiveNews(NewsBusiness.NEWS_LIMIT, offset);
    }

    return {
      news,
    };
  }

  public async getNewsById(id: string) {
    const newsDb = new NewsDatabase();
    const news = await newsDb.getNewsById(id);
    if (!news) {
      throw new Error("News not found");
    }

    return news;
  }
}
