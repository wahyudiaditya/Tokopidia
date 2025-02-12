import { UserJwt } from "@/types/userTypes";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

export const signToken = (data: UserJwt) => {
  return jwt.sign(data, secret);
};
