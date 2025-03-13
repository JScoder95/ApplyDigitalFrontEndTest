import React from "react";
import Link from "next/link";
import ApplyDigitalLogo from "../../../../../public/game-images/applylogo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-primary h-[172px] flex items-center justify-center">
      <Link href="/">
        <div className="flex items-center">
          <Image
            src={ApplyDigitalLogo}
            alt="Apply Digital Logo"
            width={177}
            height={44}
          />
        </div>
      </Link>
    </footer>
  );
};

export default Footer;
