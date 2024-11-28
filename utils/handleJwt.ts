import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { Users } from "../interfaces/userLoginInterface";

export const tokenSign = async (user: Partial<Users>): Promise<string> => {
  if (!JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  const sign = jwt.sign(
    {
      id: user.id,
    },
    JWT_SECRET as string,
    {
      expiresIn: "2h",
    }
  );
  return sign;
};

export const verifyToken = async (
  tokenJwt: string
): Promise<string | object | null> => {
  if (!JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
