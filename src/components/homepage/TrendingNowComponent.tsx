"use client";
import Image from "next/image";

export default function TrendingNowComponent() {
  const products = [
    {
      name: "Gaming Gear",
      img: "/img/gaming-gear.png",
      totalProduct: 433,
    },
    {
      name: "Clothes",
      img: "/img/clothes.png",
      totalProduct: 542,
    },
    {
      name: "Backpack",
      img: "/img/backpack.png",
      totalProduct: 622,
    },
    {
      name: "Laptops",
      img: "/img/laptop.png",
      totalProduct: 214,
    },
    {
      name: "GPU",
      img: "/img/gpu.png",
      totalProduct: 132,
    },
    {
      name: "Gaming Gear",
      img: "/img/gaming-gear.png",
      totalProduct: 870,
    },
    {
      name: "Sneakers",
      img: "/img/sneakers.png",
      totalProduct: 312,
    },
    {
      name: "Monitor",
      img: "/img/monitor.png",
      totalProduct: 322,
    },
  ];
  return (
    <div>
      <div className="text-xl font-bold py-2 border-b-inherit">
        <span>Trending Now</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {products.map((el, index) => (
          <div
            key={index}
            className="flex col-span-1 w-[270px] h-[110px] border border-gray-200 shadow-md rounded-lg"
          >
            <Image src={el.img} alt="trending1" width={100} height={100} />
            <div className="text-center justify-center w-full items-center  flex flex-col">
              <p className="font-bold">{el.name}</p>
              <p className="text-gray-400 text-sm">
                {el.totalProduct}K Product
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
