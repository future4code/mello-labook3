export class Friendship {
  constructor(
    private id: string,
    private userId: string,
    private friendId: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getFriendId(): string {
    return this.friendId;
  }
}
