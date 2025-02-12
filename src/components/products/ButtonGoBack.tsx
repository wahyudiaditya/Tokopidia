"use client";

import { useRouter } from "next/navigation";

export default function ButtonGoBack() {
  const router = useRouter();

  const handleBack = async () => {
    router.back();
  };

  return (
    <button
      className="font-semibold text-sm text-green-500"
      onClick={handleBack}
    >
      Previous page
    </button>
  );
}
