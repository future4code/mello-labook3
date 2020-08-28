import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { User, toUserRole, UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";

export class UserBusiness {
  public async signup(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    if (!email || email.indexOf("@") === -1) {
      throw new Error("Invalid email");
    }

    if (!password || password.length < 6) {
      throw new Error("Invalid password");
    }

    const id = new IdGenerator().generate();
    const cryptedPassword = await new HashManager().hash(password);

    const userDb = new UserDatabase();

    const user = new User(id, name, email, cryptedPassword, toUserRole(role));

    await userDb.createUser(user);

    const accessToken = new Authenticator().generateToken({
      id: user.getId(),
      email: user.getEmail(),
      role: user.getRole(),
    });

    return { id: id, accessToken };
  }

  public async login(email: string, password: string) {
    console.log("email - business", email);
    console.log("senha - business", password);

    if (!email || email.indexOf("@") === -1) {
      throw new Error("Invalid email");
    }

    if (!password || password.length < 6) {
      throw new Error("Invalid password");
    }

    const userDb = new UserDatabase();
    const user = await userDb.getUserByEmail(email);
    console.log("user que veio do banco", user);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await new HashManager().compareHash(
      password,
      user.getPassword()
    );
    console.log("validação da senha: ", isPasswordCorrect);
    
    if (!isPasswordCorrect) {
      throw new Error("Wrong password");
    }

    const accessToken = new Authenticator().generateToken({
      id: user.getId(),
      email: user.getEmail(),
      role: user.getRole(),
    });

    return { id: user.getId(), accessToken };
  }

  public async getAllUsers() {
    const userDb = new UserDatabase();
    const users = await userDb.getAllUsers();
    return {
      users: users.map((user) => ({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
      })),
    };
  }

  public async turnUserIntoSubscriber(userId: string) {
    const userDb = new UserDatabase();
    await userDb.changeUserRole(userId, UserRole.SUBSCRIBER);
  }
}
