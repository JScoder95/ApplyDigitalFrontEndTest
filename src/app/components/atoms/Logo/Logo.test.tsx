import React from "react";
import { render, screen } from "@testing-library/react";
import Logo from "./Logo";
import "@testing-library/jest-dom";

describe("Logo component", () => {
  test("renders the logo with correct text", () => {
    render(<Logo />);
    const logoElement = screen.getByText("GamerShop");
    expect(logoElement).toBeInTheDocument();
  });

  test("renders the logo with default classes", () => {
    render(<Logo />);
    const logoElement = screen.getByText("GamerShop");
    expect(logoElement).toHaveClass(
      "font-normal text-xl text-[24px] text-[#585660]"
    );
  });

  test("applies additional class names", () => {
    render(<Logo className="extra-class" />);
    const logoElement = screen.getByText("GamerShop");
    expect(logoElement).toHaveClass("extra-class");
  });

  test("has correct href attribute", () => {
    render(<Logo />);
    const logoElement = screen.getByText("GamerShop").closest("a");
    expect(logoElement).toHaveAttribute("href", "/");
  });
});
