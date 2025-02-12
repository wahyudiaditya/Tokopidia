"use client";

import Link from "next/link";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { GoBell } from "react-icons/go";
import { IoMailUnreadOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getUser, logout } from "./actions/actions";
import { toastError, toastSucces } from "@/utils/swall";
import { LogoutType } from "@/types/userTypes";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState("");
  const router = useRouter();

  const fetchUser = async () => {
    const userData = await getUser();

    if (userData?.name) {
      setUser(userData.name);
    } else {
      setUser(userData?.username as string);
    }
  };

  const handleLogout = async () => {
    const res: LogoutType = await logout();
    if (res.name === "error") {
      toastError(res.message);
      return;
    }
    toastSucces(res.message);
    router.push("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <nav className="bg-white fixed top-0 left-0 right-0 border-b py-4 z-10">
      <div className="px-20 flex items-center">
        <Link
          href={"/"}
          className="text-green-500 font-semibold me-auto text-4xl"
        >
          <p className="logo-font">tokopidia</p>
        </Link>

        <div className="flex items-center text-2xl px-6 border-r">
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <PiShoppingCartSimpleBold className="cursor-pointer" />
            </div>
            {user && (
              <>
                <div>
                  <GoBell className="cursor-pointer" />
                </div>
                <div>
                  <IoMailUnreadOutline className="cursor-pointer" />
                </div>
              </>
            )}
          </div>
        </div>

        {user ? (
          <div className="flex justify-center relative group items-center pl-6 text-sm gap-2 min-w-fit max-w-fit ">
            <div className="">
              <img
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                alt="profile"
                className="rounded-full w-7 h-7 object-cover"
              />
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300 bg-white shadow-lg rounded-md w-40 py-2">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-center ">
                    <Link href={"/wishlist"} className="w-full">
                      Wishlist
                    </Link>
                  </li>
                  <li className="">
                    <button
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <p className="truncate">{user}</p>
          </div>
        ) : (
          <div className="flex gap-4 pl-6">
            <Link
              href={"/login"}
              className="border-green-500 border text-green-500 font-bold px-4 py-1 rounded-md"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="bg-green-500 text-white font-bold px-4 py-1 rounded-md"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
