import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white";
  className?: string;
}

const Spinner = ({
  size = "md",
  color = "primary",
  className = "",
}: SpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const colorClasses = {
    primary: "border-primary",
    white: "border-white",
  };

  return (
    <div className={`${className}`}>
      <div
        role="progressbar"
        aria-label="Loading"
        className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export default Spinner;
