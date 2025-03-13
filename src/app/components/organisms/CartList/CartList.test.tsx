import React from "react";
import { render, screen } from "@testing-library/react";
import CartList from "./CartList";
import * as CartContext from "@/context/CartContext";

// Mock for CartItem
jest.mock("@/app/components/molecules/CartItem/CartItem", () => ({
  __esModule: true,
  default: ({ item }: any) => (
    <div data-testid={`cart-item-${item.id}`}>
      {item.name} - {item.price}
    </div>
  ),
}));

describe("CartList component", () => {
  const mockCartItems = [
    { id: "1", name: "Game 1", price: 50 },
    { id: "2", name: "Game 2", price: 30 },
  ];

  const useCartContextMock = {
    cart: mockCartItems,
  };

  beforeEach(() => {
    jest
      .spyOn(CartContext, "useCartContext")
      .mockReturnValue(useCartContextMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders empty cart message when cart is empty", () => {
    (CartContext.useCartContext as jest.Mock).mockReturnValue({ cart: [] });
    render(<CartList />);

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(
      screen.getByText("Add some games to your cart to see them here.")
    ).toBeInTheDocument();
  });

  test("renders cart items when cart is not empty", () => {
    render(<CartList />);

    expect(screen.getByText("2 items")).toBeInTheDocument();
    mockCartItems.forEach((item) => {
      expect(screen.getByTestId(`cart-item-${item.id}`)).toHaveTextContent(
        `${item.name} - ${item.price}`
      );
    });
  });

  test("renders CartItem component for each item in the cart", () => {
    render(<CartList />);

    mockCartItems.forEach((item) => {
      expect(screen.getByTestId(`cart-item-${item.id}`)).toBeInTheDocument();
    });
  });
});
