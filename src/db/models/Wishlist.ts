import { WishlistType } from "@/types/wishlistTypes";
import { getDb } from "../config/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

const wishlistValidation = z.object({
  userId: z.string().min(5),
  productId: z.string().min(5),
});

export class Wishlist {
  static getCollection() {
    const db = getDb();
    const collection = db.collection<WishlistType>("Wishlist");
    return collection;
  }

  static async getAllWishlist(userId: ObjectId) {
    const collection = this.getCollection();

    const wishlists = await collection
      .aggregate([
        {
          $match: {
            userId: userId,
          },
        },
        {
          $lookup: {
            from: "Products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: {
            path: "$product",
          },
        },
        {
          $project: {
            _id: 0,
            userId: 1,
            product: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ])
      .toArray();

    return wishlists;
  }

  static async addToWishlist(userId: string, productId: string) {
    const collection = this.getCollection();

    wishlistValidation.parse({
      userId: userId,
      productId: productId,
    });

    const newUserId = new ObjectId(userId);
    const newProductId = new ObjectId(productId);

    const wishlist = await collection.findOne({
      userId: newUserId,
      productId: newProductId,
    });

    if (wishlist) {
      throw { name: "error", message: "Product is already in your wishlist" };
    }

    const payload = {
      userId: newUserId,
      productId: newProductId,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    await collection.insertOne(payload);
    return "Success add product to wishlist";
  }

  static async removeWishlist(userId: ObjectId, productId: ObjectId) {
    const collection = this.getCollection();

    const wishlist = await collection.findOne({ userId, productId });
    if (!wishlist) {
      throw { name: "error", message: "Product isn't your wishlist" };
    }

    await collection.deleteOne({ userId, productId });

    return "Success remove product from your wishlist";
  }
}
