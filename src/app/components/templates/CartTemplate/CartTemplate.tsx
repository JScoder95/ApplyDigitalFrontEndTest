import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CartList from "@/app/components/organisms/CartList/CartList";
import CartSummary from "@/app/components/molecules/CartSummary/CartSummary";

const CartTemplate = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-16 container py-8">
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Catalog
      </Link>

      <h1 className="text-2xl font-bold text-primary">Your Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CartList />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartTemplate;
