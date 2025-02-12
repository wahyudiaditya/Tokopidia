"use server";

import ScrollPagetoTop from "@/components/products/ScrollPagetoTop";
import ProtectedComponent from "@/components/ProtectedComponent";
import WishlistProductCard from "@/components/wishlist/WishlistProductCard";
import { WishlistWithProductType } from "@/types/wishlistTypes";
import { BASE_URL } from "@/utils/baseUrl";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default async function Wishlist() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  if (!token) {
    redirect("/login");
  }
  const res = await fetch(`${BASE_URL}/api/wishlist`, {
    headers: {
      Cookie: `access_token=${token?.value}`,
    },
  });
  if (!res.ok) {
    redirect("/login");
  } else {
    const data = await res.json();
    const wishlist: WishlistWithProductType[] = data;

    return (
      <ProtectedComponent>
        <ScrollPagetoTop />
        <div className="mx-auto min-h-[58vh] w-[1100px] mt-24 mb-24">
          <Link
            href={"/products"}
            className="flex items-center text-gray-500 font-semibold text-xl w-fit"
          >
            <IoIosArrowBack />
            <p>Products</p>
          </Link>
          <div className="flex py-5">
            <div className="me-auto">
              <p className="font-bold text-2xl">All Wishlist</p>
              <p className="font-bold">
                {wishlist?.length ? wishlist.length : 0}{" "}
                <span className="font-normal">Items</span>
              </p>
            </div>
            <select
              name=""
              id=""
              className="rounded-md border-gray-300 border w-32 text-xs px-1 h-[33px] outline-none focus:border-green-500"
            >
              <option value="terbaru" defaultValue={"terbaru"}>
                Terbaru
              </option>
              <option value="">Harga Tertinggi</option>
              <option value="">Harga Terendah</option>
            </select>
          </div>
          {wishlist.length !== 0 ? (
            <div className="grid grid-cols-5 gap-5 justify-center mt-4">
              {wishlist?.map((el, index) => (
                <WishlistProductCard key={index} product={el?.product} />
              ))}
            </div>
          ) : (
            <>
              <p className="mt-4 flex justify-center items-center h-[500px] w-full font-semibold">
                User not have wishlist yet
              </p>
            </>
          )}
        </div>
      </ProtectedComponent>
    );
  }
}
