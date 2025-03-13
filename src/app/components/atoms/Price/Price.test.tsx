import React from "react";
import { render, screen } from "@testing-library/react";
import Price from "./Price";
import "@testing-library/jest-dom";

describe("Price component", () => {
  test("renders the price correctly", () => {
    render(<Price value={100} />);
    const priceElement = screen.getByText("$100.00");
    expect(priceElement).toBeInTheDocument();
  });

  test("renders the price with default size class", () => {
    render(<Price value={100} />);
    const priceElement = screen.getByText("$100.00");
    expect(priceElement).toHaveClass("text-base");
  });

  test("renders the price with small size class", () => {
    render(<Price value={100} size="sm" />);
    const priceElement = screen.getByText("$100.00");
    expect(priceElement).toHaveClass("text-sm");
  });

  test("renders the price with large size class", () => {
    render(<Price value={100} size="lg" />);
    const priceElement = screen.getByText("$100.00");
    expect(priceElement).toHaveClass("text-lg font-bold");
  });

  test("applies additional class names", () => {
    render(<Price value={100} className="extra-class" />);
    const priceElement = screen.getByText("$100.00");
    expect(priceElement).toHaveClass("extra-class");
  });
});
