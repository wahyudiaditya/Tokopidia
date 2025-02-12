"use server";
import { FaStar } from "react-icons/fa";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { MdShoppingBasket } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import Image from "next/image";
import { ParamsType } from "@/app/api/products/[slug]/route";
import { ProductTypeWithId } from "@/types/productTypes";
import ProductDetailCard from "@/components/products/ProductDetailCard";
import ButtonGoBack from "@/components/products/ButtonGoBack";
import { MdArrowForwardIos } from "react-icons/md";
import { Metadata, ResolvingMetadata } from "next";
import { BASE_URL } from "@/utils/baseUrl";
import ScrollPagetoTop from "@/components/products/ScrollPagetoTop";

export async function generateMetadata(
  { params }: ParamsType,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${BASE_URL}/api/products/${slug}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch product data: ${res.statusText}`);
    }

    const data: ProductTypeWithId = await res.json();

    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: data.name,
      description: data.excerpt,
      openGraph: {
        images: [data.thumbnail ?? "", ...previousImages],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    return {
      title: "Product Not Found",
      description: "No product data could be retrieved.",
      openGraph: {
        images: [],
      },
    };
  }
}

export default async function ProductDetail({ params }: ParamsType) {
  const { slug } = await params;
  const res = await fetch(`${BASE_URL}/api/products/${slug}`);
  const data = await res.json();
  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const product: ProductTypeWithId = data;

  const dummy = {
    rating: 4.5,
    options: [
      { label: "Color", values: ["Black", "White", "Blue"] },
      { label: "Storage", values: ["64GB", "128GB", "256GB"] },
    ],
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  return (
    <div className="w-[1100px] min-h-[58vh] mx-auto mt-24">
      <div className="flex items-center mb-6 text-gray-400">
        <ButtonGoBack />
        <MdArrowForwardIos className="mx-1" />
        <p className="text-sm text-black">{product?.name}</p>
      </div>
      <ScrollPagetoTop />
      <div className="flex gap-4 justify-between">
        <div className="relative group max-w-[450px]">
          <Image
            src={product?.thumbnail}
            alt={product?.name as string}
            width={450}
            height={450}
            className="rounded-lg object-cover"
          />

          <div className="flex space-x-4 mt-4 overflow-x-auto scrollbar-hide">
            {product?.images.map((image, index) => (
              <div
                key={index}
                className="w-25 h-20 border p-1 rounded-md cursor-pointer transform hover:scale-110 transition duration-300"
              >
                <Image
                  src={image}
                  alt={`${product.name}-${index}`}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-[310px]">
          <h1 className="text-xl text-gray-900">{product?.name}</h1>
          <div className="flex my-1 items-center justify-between">
            <div className="flex text-yellow-500 items-center text-sm ">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index < dummy.rating ? "text-yellow-300" : ""}
                />
              ))}
              <span className="text-xs font-semibold px-1">4.9</span>
            </div>
            <div className="w-1 h-1 flex justify-center items-center bg-gray-400 rounded-full mx-2"></div>

            <div className=" text-gray-500 flex text-xs justify-center items-center gap-1">
              <MdMarkUnreadChatAlt className="text-sm" />
              <span>259K reviews</span>
            </div>

            <div className="w-1 h-1 flex justify-center items-center bg-gray-400 rounded-full mx-2"></div>

            <div className="text-gray-500 flex text-xs justify-center items-center gap-1">
              <MdShoppingBasket className="text-sm" />
              <span>259 orders</span>
            </div>
          </div>

          {product?.price && (
            <div className="flex items-baseline space-x-4 my-4">
              <span className="text-xl font-bold">
                {formatPrice(product?.price)}
              </span>
              <span className="text-xs line-through text-gray-400">
                {formatPrice(product?.price + 900000)}
              </span>
            </div>
          )}

          <div className="flex items-center gap-1 text-green-500 font-semibold">
            <FaCheck />
            <p>In Stock</p>
          </div>

          <div className="my-4 space-y-4">
            {dummy.options.map((option, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-gray-800">{option.label}</h3>
                <div className="flex space-x-3 mt-1">
                  {option.values.map((value, index) => (
                    <button
                      key={index}
                      className={`px-2 py-1 rounded-md text-sm border-2 ${
                        option.label === "Color"
                          ? `w-8 h-8 rounded-full bg-${value.toLowerCase()}-600`
                          : `bg-white `
                      } transition-all hover:ring-2 ring-offset-2 ring-gray-300`}
                    >
                      {option.label === "Storage" ? value : null}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ProductDetailCard
          productPrice={product?.price}
          productId={product?._id}
        />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="mt-4 text-gray-600">{product?.description}</p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>
        <div className="mt-6 space-y-4">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex border-t py-4">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <div className="ml-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={index < 4 ? "text-yellow-500" : ""}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    User {idx + 1}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">Great product! I love it!</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
