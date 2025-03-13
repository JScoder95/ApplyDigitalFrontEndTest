import React from "react";
import { render, screen } from "@testing-library/react";
import CartTemplate from "./CartTemplate";

// Mock for Next.js Link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: any) => (
    <a href={href} data-testid="link-element">
      {children}
    </a>
  ),
}));

// Mock for CartList
jest.mock("@/app/components/organisms/CartList/CartList", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="cart-list-element" className="md:col-span-2">
      CartList
    </div>
  ),
}));

// Mock for CartSummary
jest.mock("@/app/components/molecules/CartSummary/CartSummary", () => ({
  __esModule: true,
  default: () => <div data-testid="cart-summary-element">CartSummary</div>,
}));

describe("CartTemplate component", () => {
  test("renders back to catalog link", () => {
    render(<CartTemplate />);
    const linkElement = screen.getByTestId("link-element");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
    expect(screen.getByText("Back to Catalog")).toBeInTheDocument();
  });

  test("renders Your Cart heading", () => {
    render(<CartTemplate />);
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });

  test("renders CartList component", () => {
    render(<CartTemplate />);
    expect(screen.getByTestId("cart-list-element")).toBeInTheDocument();
  });

  test("renders CartSummary component", () => {
    render(<CartTemplate />);
    expect(screen.getByTestId("cart-summary-element")).toBeInTheDocument();
  });

  test("renders grid layout with CartList and CartSummary", () => {
    render(<CartTemplate />);
    expect(screen.getByTestId("cart-list-element")).toHaveClass(
      "md:col-span-2"
    );
    expect(screen.getByTestId("cart-summary-element")).not.toHaveClass(
      "md:col-span-2"
    );
  });
});
