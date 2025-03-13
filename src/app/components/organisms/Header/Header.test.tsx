import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import * as CartContext from "@/context/CartContext";

// Mock for Link Next.js
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: any) => (
    <a href={href} data-testid="link-element">
      {children}
    </a>
  ),
}));

// Mock for Logo
jest.mock("@/app/components/atoms/Logo/Logo", () => ({
  __esModule: true,
  default: () => <div data-testid="logo-element">Logo</div>,
}));

describe("Header component", () => {
  const mockGetCartItemsCount = jest.fn();

  beforeEach(() => {
    jest.spyOn(CartContext, "useCartContext").mockReturnValue({
      getCartItemsCount: mockGetCartItemsCount,
    });
    mockGetCartItemsCount.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders Logo component", () => {
    render(<Header />);
    expect(screen.getByTestId("logo-element")).toBeInTheDocument();
  });

  test("renders cart link", () => {
    render(<Header />);
    const linkElement = screen.getByTestId("link-element");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/cart");
  });

  test("renders cart items count when greater than 0", () => {
    mockGetCartItemsCount.mockReturnValue(3);
    render(<Header />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("does not render cart items count when 0", () => {
    mockGetCartItemsCount.mockReturnValue(0);
    render(<Header />);
    expect(screen.queryByText("0")).toBeNull();
  });

  test("does not render cart items count when less than 0", () => {
    mockGetCartItemsCount.mockReturnValue(-1);
    render(<Header />);
    expect(screen.queryByText("-1")).toBeNull();
  });
});
