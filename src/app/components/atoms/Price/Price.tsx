import React from "react";

interface PriceProps {
  value: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Price = ({ value, size = "md", className = "" }: PriceProps) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg font-bold",
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

  return (
    <span className={`${sizeClasses[size]} ${className}`}>
      {formattedPrice}
    </span>
  );
};

export default Price;
