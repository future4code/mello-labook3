export class News {
  constructor(
    private id: string,
    private title: string,
    private content: string,
    private isExclusive: boolean
  ) {}

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getContent(): string {
    return this.content;
  }

  public getIsExclusive(): boolean {
    return this.isExclusive;
  }
}

export interface FeedOutputDTO {
  id: string,
  title: string
}