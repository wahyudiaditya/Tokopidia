import { User } from "@/db/models/User";
import { UserLoginType } from "@/types/userTypes";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body: UserLoginType = await req.json();

    const token = await User.login(body);

    const response = NextResponse.json({ token });
    response.cookies.set("access_token", token);

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: error.issues[0].message },
        { status: 400 }
      );
    }
    if ((error as Error).name === "error") {
      return Response.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
