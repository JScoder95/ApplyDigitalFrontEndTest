import React from "react";
import { render, screen } from "@testing-library/react";
import CartSummary from "./CartSummary";
import * as CartContext from "@/context/CartContext";
import "@testing-library/jest-dom";

describe("CartSummary component", () => {
  // Mock data for testing a cart with items
  const mockCart = [
    {
      id: "1",
      name: "Item 1",
      price: 10,
      quantity: 2,
    },
    {
      id: "2",
      name: "Item 2",
      price: 20,
      quantity: 1,
    },
  ];

  // Mock functions for cart total and items count
  const mockGetCartTotal = jest.fn(() => 40); // 10 * 2 + 20 * 1
  const mockGetCartItemsCount = jest.fn(() => 3); // 2 + 1

  // Mock context object to simulate useCartContext
  const useCartContextMock = {
    cart: mockCart,
    getCartTotal: mockGetCartTotal,
    getCartItemsCount: mockGetCartItemsCount,
  };

  // Set up mock before each test
  beforeEach(() => {
    jest
      .spyOn(CartContext, "useCartContext")
      .mockReturnValue(useCartContextMock);
  });

  // Clean up mocks after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test: renders order summary with correct details
  test("renders order summary with correct details", () => {
    render(<CartSummary />);

    // Check if order summary title is present
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    // Check if items count is correctly rendered
    expect(screen.getByText("3 items")).toBeInTheDocument();

    // Check if item names are present
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();

    // Check if item prices are correctly displayed
    const priceElements = screen.getAllByText("$20.00");
    expect(priceElements).toHaveLength(2); // Expect 2 elements with "$20.00"

    // Check if order total is correctly rendered
    expect(screen.getByText("Order Total")).toBeInTheDocument();
    expect(screen.getByText("$40.00")).toBeInTheDocument();

    // Check if checkout button is present
    expect(
      screen.getByRole("button", { name: "Checkout" })
    ).toBeInTheDocument();
  });

  // Test: renders correctly with an empty cart
  test("renders correctly with an empty cart", () => {
    // Mock data for an empty cart
    const emptyCartMock = {
      cart: [],
      getCartTotal: jest.fn(() => 0),
      getCartItemsCount: jest.fn(() => 0),
    };

    // Simulate useCartContext with an empty cart
    jest.spyOn(CartContext, "useCartContext").mockReturnValue(emptyCartMock);

    render(<CartSummary />);

    // Check if order summary is still rendered
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    // Check if items count is zero
    expect(screen.getByText("0 items")).toBeInTheDocument();
    // Check if order total is zero
    expect(screen.getByText("Order Total")).toBeInTheDocument();
    expect(screen.getByText("$0.00")).toBeInTheDocument();
    // Check if checkout button is still rendered
    expect(
      screen.getByRole("button", { name: "Checkout" })
    ).toBeInTheDocument();
  });
});
