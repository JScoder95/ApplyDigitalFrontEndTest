import { Suspense } from "react";
import CatalogTemplate from "@/app/components/templates/Catalog/CatalogTemplate";
import Spinner from "@/app/components/atoms/Spinner/Spinner";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      }
    >
      <CatalogTemplate />
    </Suspense>
  );
}
