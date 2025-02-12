"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { UserLoginType, UserTypeWithId } from "@/types/userTypes";
import { redirect } from "next/navigation";
import * as jose from "jose";
import { BASE_URL } from "@/utils/baseUrl";

export async function login(payload: UserLoginType) {
  const res = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    return { name: "error", message: data.message };
  }

  const cookieStore = await cookies();
  cookieStore.set("access_token", data.token);

  return data;
}

export async function removeWishlist(id: ObjectId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const res = await fetch(`${BASE_URL}/api/wishlist`, {
    method: "DELETE",
    headers: {
      Cookie: `access_token=${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  const data = await res.json();

  if (!res.ok) {
    return { name: "error", message: data.message };
  }

  revalidatePath("/");
  return data;
}

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  if (!token) return null;
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

  const jwt = token.value as string;

  const { payload } = await jose.jwtVerify<UserTypeWithId>(jwt, secretKey);
  return { name: payload.name, username: payload.username };
}

export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    return { name: "error", message: "User not login yet" };
  }

  cookieStore.delete("access_token");

  return { name: "success", message: "Logout successfully" };
}

export const toLoginPage = async () => {
  redirect("/login");
};
