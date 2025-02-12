"use client";
import React, { useState, useEffect } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="flex justify-center items-center">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed right-[50px] bottom-[50px] text-black cursor-pointer flex flex-col items-center"
        >
          <FaArrowAltCircleUp className="text-5xl" />
          <span className="text-sm mt-1 font-semibold">BACK TO TOP</span>
        </button>
      )}
    </div>
  );
}
