"use client";

import { login } from "@/components/actions/actions";
import { toastError, toastSucces } from "@/utils/swall";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const LottieAuthAnimations = dynamic(
  () => import("@/components/LottieAuthAnimations"),
  {
    ssr: false,
  }
);

export default function Login() {
  const [input, setInput] = useState({
    email: "wahyudi@mail.com",
    password: "123456",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const message = await login(input);
      if (message.name === "error") {
        toastError(message.message);
        return;
      }

      toastSucces("Login successfully");
      router.push("/");
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ error:", error);
      toastError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <div className="text-center mb-6">
        <p className="font-semibold text-green-500 text-5xl logo-font">
          tokopidia
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10 max-w-2xl w-full mt-10">
        <div className="flex justify-center items-center w-full md:w-1/2 mb-8 md:mb-0">
          <LottieAuthAnimations />
        </div>
        <div className="w-full md:w-1/2 p-10 rounded-md shadow-md bg-white">
          <div className="pb-8 flex items-center justify-between">
            <p className="text-xl font-bold">Login to Tokopidia</p>
            <Link href="/register" className="text-green-500 text-xs">
              Register
            </Link>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email@mail.com"
              value={input.email}
              onChange={(e) => {
                setInput({
                  ...input,
                  email: e.target.value,
                });
              }}
              required
              className="bg-transparent w-full py-2 text-xs hover:outline-none outline-none border rounded-md px-2 border-gray-300"
            />
            <input
              type="password"
              placeholder="Password"
              value={input.password}
              onChange={(e) => {
                setInput({
                  ...input,
                  password: e.target.value,
                });
              }}
              required
              className="bg-transparent w-full py-2 text-xs hover:outline-none outline-none border rounded-md px-2 my-4 border-gray-300"
            />
            <button className="rounded bg-green-500 text-white px-4 py-2 w-full h-[40px] mt-4 font-semibold">
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
