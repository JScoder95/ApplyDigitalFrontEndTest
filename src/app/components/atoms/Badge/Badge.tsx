import React from "react";
interface BadgeProps {
  text: string;
  variant?: "new" | "primary" | "secondary";
  className?: string;
}

const Badge = ({ text, variant = "primary", className = "" }: BadgeProps) => {
  const variantClasses = {
    new: "bg-white text-gray-800",
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
  };

  return (
    <span
      className={`inline-block px-3 py-1.5 text-sm font-normal rounded-lg shadow-sm ${variantClasses[variant]} ${className}`}
    >
      {text}
    </span>
  );
};

export default Badge;
