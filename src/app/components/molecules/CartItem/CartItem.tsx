"use client";

import React from "react";
import Image from "next/image";
import Price from "@/app/components/atoms/Price/Price";
import type { CartItem as CartItemType } from "@/hooks/useCart";
import { useCartContext } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart } = useCartContext();

  return (
    <div className="relative flex flex-col md:flex-row border-b py-4 max-w-full md:max-w-[678px] w-full">
      <div className="relative w-full h-[136px] md:w-[256px] md:h-[156px] flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          sizes="(max-width: 678px) 100vw, 256px"
          className="object-cover rounded"
        />
      </div>
      <div className="p-4 flex-grow">
        <div className="font-bold uppercase text-secondary tracking-wide mb-1">
          {item.genre.toUpperCase()}
        </div>
        <h3 className="font-bold text-sm mb-1 text-primary">{item.name}</h3>
        <p className="text-base text-secondary mb-4">
          Description if necessary
        </p>
      </div>
      <div className="flex justify-end items-center md:justify-start md:items-end p-4">
        <Price value={item.price} className="font-bold text-xl text-primary" />
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="absolute top-2 right-2 text-[#8F8F8F] hover:text-gray-600"
        aria-label="Remove item"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;
