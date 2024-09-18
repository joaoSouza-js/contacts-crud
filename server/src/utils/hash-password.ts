import bcrypt from "bcrypt";

export function hashPassword(password: string): string {
    const randomSalt = Math.round(Math.random() * 10);
    const hashedPassword = bcrypt.hashSync(password, randomSalt);
    return hashedPassword;
}
