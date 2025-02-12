"use client";
import Image from "next/image";
import TopUpBillsCard from "./TopUpBillsCard";

export default function CategoryHome() {
  const image = [
    {
      img: "/img/food-category.png",
      category: "Foods",
    },
    {
      img: "/img/toy-category.png",
      category: "Toys",
    },
    {
      img: "/img/smartphone.png",
      category: "Phones",
    },
    {
      img: "/img/electronic.png",
      category: "Electronics",
    },
  ];
  return (
    <div className="border-gray-300 rounded-lg shadow-md w-full p-4">
      <div className="flex">
        <div className="w-1/2 ">
          <span className="font-bold text-xl">Kategori Pilihan</span>
          <div className="flex gap-4 pt-4">
            {image.map((e, index) => (
              <div
                key={index}
                className="border rounded-lg w-[100px] h-[100px] flex-col flex justify-center items-center"
              >
                <Image src={e.img} width={70} height={50} alt="" className="" />
                <span className="text-xs font-semibold">{e.category}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 pl-4">
          <TopUpBillsCard />
        </div>
      </div>
    </div>
  );
}
