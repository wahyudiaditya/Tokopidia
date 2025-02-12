import { Wishlist } from "@/db/models/Wishlist";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const id = req.headers.get("x-user-id") as string;
    const userId = new ObjectId(id);

    const wishlist = await Wishlist.getAllWishlist(userId);
    return Response.json(wishlist);
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

export async function POST(req: NextRequest) {
  try {
    const id = req.headers.get("x-user-id") as string;

    const productId = await req.json();

    const message = await Wishlist.addToWishlist(id, productId);

    return Response.json(message);
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

export async function DELETE(req: NextRequest) {
  try {
    const id = req.headers.get("x-user-id") as string;
    const productId: string = await req.json();

    const userId = new ObjectId(id);
    const newProductId = new ObjectId(productId);

    const message = await Wishlist.removeWishlist(userId, newProductId);

    return Response.json(message);
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
