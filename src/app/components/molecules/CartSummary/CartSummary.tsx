"use client";
import React from "react";
import Price from "@/app/components/atoms/Price/Price";
import { useCartContext } from "@/context/CartContext";

const CartSummary = () => {
  const { cart, getCartTotal, getCartItemsCount } = useCartContext();
  const total = getCartTotal();
  const itemsCount = getCartItemsCount();

  return (
    <div className="space-y-10">
      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-primary font-bold text-lg mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
          <div className="text-sm text-primary">{itemsCount} items</div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm md:mt-3">
              <span>{item.name}</span>
              <Price value={item.price * item.quantity} size="sm" />
            </div>
          ))}
        </div>
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold">
            <span className="text-primary">Order Total</span>
            <Price value={total} size="lg" className="text-primary" />
          </div>
        </div>
      </div>

      <button className="w-full bg-[#585660] text-white py-3 rounded-lg hover:bg-primary/90 transition-colors">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
