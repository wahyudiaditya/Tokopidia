"use client";

import { PriceParamsType } from "@/types/productTypes";
import { BASE_URL } from "@/utils/baseUrl";
import { swallUnauthorized, toastError, toastSucces } from "@/utils/swall";
import { useState } from "react";
import { FaCartPlus, FaTruck, FaMoneyBillWaveAlt } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { MdStars } from "react-icons/md";

export default function ProductDetailCard({
  productPrice,
  productId,
}: PriceParamsType) {
  const [isWishlist, setIsWishlist] = useState(false);

  const formatPrice = (price: number) =>
    price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  const handleAddWishlist = async () => {
    const res = await fetch(`${BASE_URL}/api/wishlist`, {
      method: "POST",
      headers: {
        ContentType: "application/json",
      },
      body: JSON.stringify(productId),
    });

    const data = await res.json();
    if (!res.ok) {
      if (data.message === "Unauthorize") {
        swallUnauthorized("You're not logged in, please log in.");
        return;
      }
      toastError(data.message);
      return;
    }
    setIsWishlist(true);
    toastSucces(data);
  };
  return (
    <div className="border-gray-300 broder rounded-lg w-[250px] h-fit shadow-md">
      <div className="p-4">
        <span className="font-bold text-xl">{formatPrice(productPrice)}</span>
        <p className="text-xs text-gray-400">Price per kg. Includes VAT</p>

        <div className="flex justify-center py-4 items-center gap-2">
          <div className="flex items-center font-semibold space-x-2 my-5 border rounded-md w-fit">
            <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-50">
              -
            </button>
            <div className="w-4 h-18 flex items-center justify-center  border-gray-300 text-gray-700">
              1
            </div>
            <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-50">
              +
            </button>
          </div>
          <span className="">Kg.</span>
        </div>
        <div className="font-semibold">
          <div className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center gap-2">
            <FaCartPlus />
            <button>Add to Cart</button>
          </div>
          <div className="w-full bg-blue-100 text-blue-500 py-2 my-2 rounded-md flex items-center justify-center gap-2">
            <button>Buy Now</button>
          </div>
          <button
            className="w-full  text-blue-500 py-2 border-b  flex items-center justify-center gap-2"
            onClick={handleAddWishlist}
          >
            {isWishlist ? <GoHeartFill /> : <GoHeart />}
            <span>Add to Wishlist</span>
          </button>
          <div className="mt-4">
            <div className="flex items-center text-gray-400">
              <FaTruck className="mr-4" />
              <span className="text-sm font-thin">Free Shipping</span>
            </div>
            <div className="flex items-center py-1 text-gray-400">
              <FaMoneyBillWaveAlt className="mr-4 " />
              <span className="text-sm font-thin">Secure Payment</span>
            </div>
            <div className="flex items-center text-gray-400">
              <MdStars className="mr-4" />
              <span className="text-sm font-thin">4 years full waranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
