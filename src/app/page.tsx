"use server";

import Carousel from "@/components/homepage/Carousel";
import CategoryHome from "@/components/homepage/CategoryHome";
import ProductCard from "@/components/products/ProductCard";
import TrendingNowComponent from "@/components/homepage/TrendingNowComponent";
import { ProductTypeWithId } from "@/types/productTypes";
import Link from "next/link";
import { BASE_URL } from "@/utils/baseUrl";
import ScrollPagetoTop from "@/components/products/ScrollPagetoTop";

export async function generateMetadata() {
  return {
    title: "Tokopidia",
    description:
      "is an e-commerce platform that offers a wide range of everyday products at competitive prices. The website makes online shopping convenient, featuring everything from electronics, clothing, food, to household items, all in one place.",
    openGraph: {
      images: ["/img/tokopidia-logo.png"],
    },
  };
}

export default async function Home() {
  const q = "";
  const page = 1;
  const res = await fetch(`${BASE_URL}/api/products?q=${q}&page=${page}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return <div>Something went wrong ...</div>;
  }
  const products: ProductTypeWithId[] = await res.json();

  return (
    <div className="container min-h-[58vh] mx-auto my-24 lg:w-[1100px] md:w-[700px]">
      <ScrollPagetoTop />
      <Carousel />
      <div className="mt-5 text-start w-full">
        <CategoryHome />

        <div className="py-5">
          <TrendingNowComponent />
        </div>

        <div className="flex justify-between">
          <div>
            <p className="font-bold text-xl">Featured Product</p>
          </div>
          <Link
            href={"/products"}
            className="text-sm font-semibold text-green-500"
          >
            See All Products
          </Link>
        </div>
        <div className="grid grid-cols-5 gap-5 justify-center mt-4">
          {products.slice(0, 5).map((el) => (
            <div key={el._id.toString()} className="col-span-1 ">
              <ProductCard product={el} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
