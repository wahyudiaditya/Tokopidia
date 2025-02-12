import { UserLoginType, UserType } from "@/types/userTypes";
import { getDb } from "../config/mongodb";
import { z } from "zod";
import { ObjectId } from "mongodb";
import { comparePw, hashPw } from "../helpers/bcryptjs";
import { signToken } from "../helpers/jwt";

const UserValidation = z.object({
  name: z.string(),
  username: z
    .string()
    .trim()
    .min(4, { message: "Username must be at least 4 characters long" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string()
    .trim()
    .min(5, { message: "Password must be at least 5 characters long" }),
});

export class User {
  static getCollection() {
    const db = getDb();
    const collection = db.collection<UserType>("Users");
    return collection;
  }

  static async register(payload: UserType) {
    UserValidation.parse(payload);
    const collection = this.getCollection();
    const { email, username, password } = payload;

    const userByUsername = await this.findByQuery({ username });
    if (userByUsername) {
      throw { name: "error", message: "Username already exists" };
    }

    const userByEmail = await this.findByQuery({ email });
    if (userByEmail) {
      throw { name: "error", message: "Email already exists" };
    }

    const hashPassword = hashPw(password);
    payload.password = hashPassword;

    await collection.insertOne(payload);

    return "Register successfully";
  }

  static async findByQuery(query: Partial<UserType>) {
    const collection = this.getCollection();
    const user = await collection.findOne(query);
    if (!user) {
      return null;
    }
    return user;
  }

  static async findById(id: string) {
    const collection = this.getCollection();
    const user = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!user) {
      return null;
    }
    return user;
  }

  static async login(payload: UserLoginType) {
    const { email, password } = payload;

    const loginValidation = z.object({
      email: z
        .string()
        .trim()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email format" }),
      password: z
        .string()
        .trim()
        .min(5, { message: "Password must be at least 5 characters long" }),
    });

    loginValidation.parse(payload);

    const user = await this.findByQuery({ email });
    if (!user) {
      throw { name: "error", message: "Invalid email or password" };
    }

    const isPasswordValid = comparePw(password, user.password);
    if (!isPasswordValid) {
      throw { name: "error", message: "Invalid email or password" };
    }

    const token = signToken({
      _id: user._id,
      email: user.email,
      name: user.name,
      username: user.username,
    });

    return token;
  }
}
