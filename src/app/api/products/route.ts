import { Product } from "@/db/models/Product";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") as string;
    const page: string = searchParams.get("page") || "1";
    const getPage: number = +page;

    const products = await Product.getAllProducts(query, getPage);

    return Response.json(products);
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return Response.json({ message: "Internal server err" }, { status: 500 });
  }
}
