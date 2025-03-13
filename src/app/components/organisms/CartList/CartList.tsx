"use client";
import React from "react";
import CartItem from "@/app/components/molecules/CartItem/CartItem";
import { useCartContext } from "@/context/CartContext";

const CartList = () => {
  const { cart } = useCartContext();

  if (cart.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Add some games to your cart to see them here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-500 mb-4">{cart.length} items</p>
      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CartList;
