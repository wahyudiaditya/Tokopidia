"use server";

import { User } from "@/db/models/User";
import { UserType } from "@/types/userTypes";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body: UserType = await req.json();

    const message = await User.register(body);

    return Response.json({ message }, { status: 201 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);

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
