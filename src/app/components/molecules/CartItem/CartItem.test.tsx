import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "./CartItem"; // Asegúrate de que la ruta sea correcta
import * as CartContext from "@/context/CartContext"; // Ruta correcta al módulo
import "@testing-library/jest-dom";

const mockRemoveFromCart = jest.fn();
const mockAddToCart = jest.fn();
const mockUpdateQuantity = jest.fn();
const mockClearCart = jest.fn();

interface CartItemType {
  id: string;
  name: string;
  genre: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  isNew: boolean;
}

describe("CartItem component", () => {
  const item: CartItemType = {
    id: "1",
    name: "Test Item",
    genre: "Action",
    price: 59.99,
    image: "/test-image.jpg",
    quantity: 1,
    description: "A cool action game",
    isNew: true,
  };

  // Simulate useCartContext
  const useCartContextMock = {
    cart: [],
    addToCart: mockAddToCart,
    removeFromCart: mockRemoveFromCart,
    updateQuantity: mockUpdateQuantity,
    clearCart: mockClearCart,
  };

  beforeEach(() => {
    jest
      .spyOn(CartContext, "useCartContext")
      .mockReturnValue(useCartContextMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders the cart item with correct details", () => {
    render(<CartItem item={item} />);

    expect(screen.getByText("ACTION")).toBeInTheDocument();
    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("$59.99")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Test Item" })).toHaveAttribute(
      "src",
      "/_next/image?url=%2Ftest-image.jpg&w=3840&q=75"
    );
  });

  test("renders placeholder image when no image is provided", () => {
    const itemWithoutImage = { ...item, image: "" };

    render(<CartItem item={itemWithoutImage} />);

    expect(screen.getByRole("img", { name: "Test Item" })).toHaveAttribute(
      "src",
      "/placeholder.svg"
    );
  });

  test("calls removeFromCart when the remove button is clicked", () => {
    render(<CartItem item={item} />);

    const removeButton = screen.getByLabelText("Remove item");
    fireEvent.click(removeButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(item.id);
  });
});
