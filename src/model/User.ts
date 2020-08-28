export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: UserRole
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getRole(): UserRole {
    return this.role;
  }
}

export enum UserRole {
  NORMAL = "NORMAL",
  SUBSCRIBER = "SUBSCRIBER",
  ADMIN = "ADMIN",
}

export const toUserRole = (value: string): UserRole => {
  switch (value) {
    case "NORMAL":
      return UserRole.NORMAL;
    case "SUBSCRIBER":
      return UserRole.SUBSCRIBER;
    case "ADMIN":
      return UserRole.ADMIN;
    default:
      return UserRole.NORMAL;
  }
};
