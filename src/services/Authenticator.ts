import * as jwt from "jsonwebtoken";
import { UserRole, toUserRole } from "../model/User";

export class Authenticator {
  private static EXPIRES_IN = "48h";
  public generateToken(input: AuthenticationData): string {
    const token = jwt.sign(
      {
        id: input.id,
        email: input.email,
        role: input.role,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: Authenticator.EXPIRES_IN,
      }
    );
    return token;
  }

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
      email: payload.email,
      role: toUserRole(payload.role),
    };
    return result;
  }
}

interface AuthenticationData {
  id: string;
  email: string;
  role: UserRole;
}
