"use client";

import { useEffect } from "react";

export default function ScrollPagetoTop() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return <></>;
}
