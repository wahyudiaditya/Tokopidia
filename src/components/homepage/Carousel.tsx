"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const images = [
  "https://images.tokopedia.net/img/cache/1208/NsjrJu/2025/1/9/62d8ef70-fb01-4344-bd5a-d6d3abc96f7b.jpg.webp?ect=4g",
  "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/12/18/0b6f7df1-951f-4d9d-9d80-3aa7b3c8841f.jpg.webp?ect=4g",
  "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/7/22/6d79d227-67fe-497a-a904-af990882e2ee.jpg.webp?ect=4g",
  "https://images.tokopedia.net/img/cache/1208/NsjrJu/2025/1/15/af2e05d6-f29d-432a-8591-c6057355d22e.jpg.webp?ect=4g",
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full mx-auto group rounded-lg">
      <div className="overflow-hidden relative rounded-lg">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 rounded-lg overflow-hidden"
            >
              <Image
                src={src}
                alt={`Carousel image ${index + 1}`}
                className="w-full h-auto object-cover"
                width={500}
                height={0}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevImage}
        className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-x-[30px] group-hover:translate-x-0 transition-all duration-500 ease-out"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 -translate-x-[30px] group-hover:translate-x-0 transition-all duration-500 ease-out"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
