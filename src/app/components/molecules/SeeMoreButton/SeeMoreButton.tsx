"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SeeMoreButtonProps {
  currentPage: number;
  totalPages: number;
}

const SeeMoreButton = ({ currentPage, totalPages }: SeeMoreButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (currentPage >= totalPages) {
    return null;
  }

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (currentPage + 1).toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex content-center mb-12 md:mt-[48px] md:mb-[48px] ">
      <button
        onClick={handleClick}
        className="w-full md:w-[137px] h-[56px] bg-[#585660] text-white font-bold text-base hover:bg-primary/90 transition-colors rounded-lg"
      >
        SEE MORE
      </button>
    </div>
  );
};

export default SeeMoreButton;
