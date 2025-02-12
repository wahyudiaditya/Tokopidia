"use client";

import { BASE_URL } from "@/utils/baseUrl";
import { toastError, toastSucces } from "@/utils/swall";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";

const LottieAuthAnimations = dynamic(
  () => import("@/components/LottieAuthAnimations"),
  {
    ssr: false,
  }
);

export default function Register() {
  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const message = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await message.json();
      if (!message.ok) {
        toastError(data.message);
        return;
      }
      toastSucces(data.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
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
          <div className="text-center pb-8">
            <p className="text-xl font-bold">Sign Up Now</p>
            <p className="text-xs">
              Already have a Tokopidia account?{" "}
              <Link href="/login" className="text-green-500 ">
                Login
              </Link>
            </p>
          </div>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col sm:flex-row gap-4 py-4">
              <input
                type="text"
                placeholder="Name"
                value={input.name}
                onChange={(e) => {
                  setInput({
                    ...input,
                    name: e.target.value,
                  });
                }}
                required
                className="bg-transparent w-full sm:w-1/2 py-2 text-xs hover:outline-none outline-none border rounded-md px-2 border-gray-300"
              />
              <input
                type="text"
                placeholder="Username"
                value={input.username}
                onChange={(e) => {
                  setInput({
                    ...input,
                    username: e.target.value,
                  });
                }}
                required
                className="bg-transparent w-full sm:w-1/2 py-2 text-xs hover:outline-none outline-none border rounded-md px-2 border-gray-300"
              />
            </div>
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
                "Register"
              )}
            </button>

            <div className="text-xs text-center pt-8">
              <p>By registering, I agree to</p>
              <p className="text-green-500 font-semibold">
                Terms and Conditions{" "}
                <span className="text-black font-thin">with</span> Privacy
                Policy
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
