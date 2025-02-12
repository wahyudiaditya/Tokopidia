import { Product } from "@/db/models/Product";
import { z } from "zod";

export type ParamsType = {
  params: Promise<{ slug: string }>;
};

export async function GET(req: Request, { params }: ParamsType) {
  const { slug } = await params;
  try {
    const product = await Product.getProductBySlug(slug);

    return Response.json(product);
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
