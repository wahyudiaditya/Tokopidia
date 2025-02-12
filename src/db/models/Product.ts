import { ProductType } from "@/types/productTypes";
import { getDb } from "../config/mongodb";
// import { z } from "zod";

// const productValidation = z.object({
//   name: z.string().min(5),
//   slug: z.string().min(5),
// });
export class Product {
  static getCollection() {
    const db = getDb();
    const collection = db.collection<ProductType>("Products");
    return collection;
  }

  static async getAllProducts(q: string, page: number = 1) {
    const collection = this.getCollection();

    const regex = new RegExp(q, "i");
    const products = await collection
      .aggregate([
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $match: {
            name: { $regex: regex },
          },
        },
        {
          $skip: (page - 1) * 15,
        },
        {
          $limit: 15,
        },
      ])
      .toArray();

    return products;
  }

  static async getProductBySlug(slug: string) {
    const collection = this.getCollection();

    const product = await collection.findOne({ slug: slug });
    if (!product) {
      throw { name: "error", message: "Product is not found" };
    }

    return product;
  }
}
