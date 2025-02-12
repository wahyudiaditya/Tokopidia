"use client";
import Image from "next/image";
import React from "react";
import { GoHeartFill } from "react-icons/go";
import Link from "next/link";
import { formatPrice } from "@/utils/formatRP";
import { MdPlusOne } from "react-icons/md";
import { toastError, toastSucces } from "@/utils/swall";
import { WishlistCardProps } from "@/types/wishlistTypes";
import { removeWishlist } from "../actions/actions";

export default function WishlistProductCard({ product }: WishlistCardProps) {
  const handleRemoveWishlist = async () => {
    try {
      const result = await removeWishlist(product._id);

      if (result.name === "error") {
        toastError(result.message);
        return;
      }
      toastSucces(result);
    } catch (error) {
      console.log("🚀 ~ handleRemoveWishlist ~ error:", error);
    }
  };
  return (
    <div>
      <div className=" rounded-md shadow-md bg-white w-[200px] h-[330px]">
        <div className="relative rounded-t-lg h-[200px] flex items-center justify-center overflow-hidden transition-shadow hover:shadow-xl group cursor-pointer">
          <Image
            src={product.thumbnail}
            alt={product.name}
            width={200}
            height={200}
            className="rounded-t-md transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
          <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
            <Link
              href={`/products/${product.slug}`}
              className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60"
            >
              See Detail
            </Link>
          </div>
        </div>
        <div className="px-2 pt-2 text-xs">
          <p className="line-clamp-2 h-[32px]">{product.name}</p>
          <p className="font-bold pt-2">{formatPrice(product.price)}</p>
          <div className="flex items-center gap-1 pt-1">
            <Image
              src={
                "https://images.tokopedia.net/img/official_store/badge_os.png"
              }
              alt="bedge"
              width={15}
              height={15}
            />
            <p className="flex items-center h-full text-xs text-gray-500">
              Jakarta Pusat
            </p>
          </div>
          <div className="flex text-sm gap-2 py-2 pt-3">
            <button
              className="flex items-center gap-1 border-r px-2"
              onClick={handleRemoveWishlist}
            >
              <GoHeartFill className="text-red-500" />
              <p className="text-xs">Remove</p>
            </button>
            <div className="flex items-center gap-1 border-green-500 border py-1 px-2 bg-green-100">
              <MdPlusOne />
              <p className="text-xs">Add to Cart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
