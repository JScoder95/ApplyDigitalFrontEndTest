import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link
      href="/"
      className={`font-normal text-xl text-[24px] text-[#585660] ${className}`}
    >
      GamerShop
    </Link>
  );
};

export default Logo;
