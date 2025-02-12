"use client";

import { useState } from "react";

export default function TopUpBillsCard() {
  const [selectedCategory, setSelectedCategory] = useState("pulsa");

  const handleButtonClick = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <>
      <p className="font-bold text-xl">
        Top Up & Bills <span className="text-green-500 text-xs">View All</span>
      </p>

      <div className="border rounded-lg mt-4 w-full">
        <div className="flex">
          <button
            onClick={() => handleButtonClick("pulsa")}
            className={`flex-1 py-2 text-center text-sm text-gray-500 border-gray-300  focus:outline-none ${
              selectedCategory === "pulsa" ? "border-b-2 border-green-500 " : ""
            }`}
          >
            Pulsa
          </button>
          <button
            onClick={() => handleButtonClick("paket")}
            className={`flex-1 py-2 text-center text-sm text-gray-500 border-gray-300  focus:outline-none ${
              selectedCategory === "paket" ? "border-b-2 border-green-500 " : ""
            }`}
          >
            Paket Data
          </button>
          <button
            onClick={() => handleButtonClick("lainnya")}
            className={`flex-1 py-2 text-center text-sm text-gray-500 border-gray-300  focus:outline-none ${
              selectedCategory === "lainnya"
                ? "border-b-2 border-green-500 "
                : ""
            }`}
          >
            Lainnya
          </button>
        </div>
        <div>
          {selectedCategory === "pulsa" && (
            <div className="p-2 text-sm border bg-gray-50 text-gray-500 flex gap-4">
              <div>
                <p className="font-semibold py-1">Phone Number</p>
                <input
                  type="text"
                  className="rounded-md border-gray-300 border text-xs p-2 outline-none hover:outline-none"
                  placeholder="Input the Number"
                />
              </div>
              <div className="w-full">
                <p className="font-semibold py-1">Nominal</p>
                <input
                  type="text"
                  className="rounded-md border-gray-300 border w-full text-xs p-2 outline-none hover:outline-none"
                  placeholder="Nominal"
                />
              </div>
            </div>
          )}
          {selectedCategory === "paket" && (
            <div className="p-2 text-sm border bg-gray-50 text-gray-500 flex gap-4">
              <div>
                <p className="font-semibold py-1">Phone Number</p>
                <input
                  type="text"
                  className="rounded-md border-gray-300 border text-xs p-2 outline-none hover:outline-none"
                  placeholder="Input the Number"
                />
              </div>
              <div className="w-full">
                <p className="font-semibold py-1 ">Select Packet</p>
                <select
                  name=""
                  id=""
                  className="rounded-md border-gray-300 border w-full text-xs px-1 h-[33px] outline-none hover:outline-none"
                >
                  <option
                    value="selected"
                    defaultValue={"selected"}
                    className="text-gray-300"
                  >
                    Select Packet
                  </option>
                  <option value="">Freedom 250 GB - Rp. 250.000</option>
                  <option value="">Freedom 250 GB - Rp. 250.000</option>
                  <option value="">Freedom 250 GB - Rp. 250.000</option>
                  <option value="">Freedom 250 GB - Rp. 250.000</option>
                  <option value="">Freedom 250 GB - Rp. 250.000</option>
                </select>
              </div>
            </div>
          )}
          {selectedCategory === "lainnya" && (
            <div className="p-2 text-sm border bg-gray-50 h-[79px]">
              <p className="font-semibold py-1">Lainnya</p>
              <p>Berikut adalah opsi untuk layanan lainnya...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
