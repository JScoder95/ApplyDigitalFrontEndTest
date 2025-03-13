import { Suspense } from "react";
import CartTemplate from "@/app/components/templates/CartTemplate/CartTemplate";
import Spinner from "@/app/components/atoms/Spinner/Spinner";

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      }
    >
      <CartTemplate />
    </Suspense>
  );
}
