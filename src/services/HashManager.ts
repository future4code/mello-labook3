import bcrypt from "bcryptjs";

export class HashManager {
  public hash = async (s: string): Promise<any> => {
    const rounds: number = Number(process.env.ROUNDS);
    const salt = await bcrypt.genSalt(rounds);
    const result = await bcrypt.hash(s, salt);
    return result;
  };

  public compareHash = async (s: string, hash: string): Promise<any> => {
    const result = await bcrypt.compare(s, hash);
    console.log("RESULTADO QUE DEVIA ESTAR CHEGANDO:", result);
    return result;
  };
}
