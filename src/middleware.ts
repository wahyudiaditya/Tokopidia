import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";
import { UserTypeWithId } from "./types/userTypes";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorize" }, { status: 401 });
    }

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = token.value as string;

    const { payload } = await jose.jwtVerify<UserTypeWithId>(jwt, secretKey);
    const reqHeaders = new Headers(request.headers);

    reqHeaders.set("x-user-id", payload._id);
    reqHeaders.set("x-user-email", payload.email);
    reqHeaders.set("x-user-name", payload.name);
    reqHeaders.set("x-user-username", payload.username);

    const response = NextResponse.next({
      request: {
        headers: reqHeaders,
      },
    });

    return response;
  }
}
