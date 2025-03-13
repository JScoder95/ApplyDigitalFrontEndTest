import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GameCard from "./GameCard";
import * as CartContext from "@/context/CartContext";
import "@testing-library/jest-dom";

// Mock for Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, fill, sizes, className }: any) => (
    <img src={src} alt={alt} style={{ objectFit: "cover" }} />
  ),
}));

describe("GameCard component", () => {
  const mockGame = {
    id: "1",
    name: "Test Game",
    genre: "Action",
    price: 59.99,
    image: "/test-image.jpg",
    isNew: true,
    description: "A test action game for the frontend challenge.",
  };

  const mockAddToCart = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockIsInCart = jest.fn();

  const useCartContextMock = {
    isInCart: mockIsInCart,
    addToCart: mockAddToCart,
    removeFromCart: mockRemoveFromCart,
  };

  beforeEach(() => {
    jest
      .spyOn(CartContext, "useCartContext")
      .mockReturnValue(useCartContextMock);
    mockAddToCart.mockClear();
    mockRemoveFromCart.mockClear();
    mockIsInCart.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders game details correctly", () => {
    render(<GameCard game={mockGame} />);

    expect(screen.getByText("ACTION")).toBeInTheDocument();
    expect(screen.getByText("Test Game")).toBeInTheDocument();
    expect(screen.getByText("$59.99")).toBeInTheDocument();
    expect(screen.getByAltText("Test Game")).toHaveAttribute(
      "src",
      "/test-image.jpg"
    );
    expect(screen.getByText("NEW")).toBeInTheDocument();
  });

  test("renders placeholder image when no image is provided", () => {
    const gameWithoutImage = { ...mockGame, image: "" };
    render(<GameCard game={gameWithoutImage} />);

    expect(screen.getByAltText("Test Game")).toHaveAttribute(
      "src",
      "/placeholder.svg"
    );
  });

  test("renders 'ADD TO CART' button when game is not in cart", () => {
    mockIsInCart.mockReturnValue(false);
    render(<GameCard game={mockGame} />);

    expect(
      screen.getByRole("button", { name: "ADD TO CART" })
    ).toBeInTheDocument();
  });

  test("renders 'REMOVE' button when game is in cart", () => {
    mockIsInCart.mockReturnValue(true);
    render(<GameCard game={mockGame} />);

    expect(screen.getByRole("button", { name: "REMOVE" })).toBeInTheDocument();
  });

  test("calls addToCart when 'ADD TO CART' button is clicked", () => {
    mockIsInCart.mockReturnValue(false);
    render(<GameCard game={mockGame} />);

    fireEvent.click(screen.getByRole("button", { name: "ADD TO CART" }));
    expect(mockAddToCart).toHaveBeenCalledWith(mockGame);
  });

  test("calls removeFromCart when 'REMOVE' button is clicked", () => {
    mockIsInCart.mockReturnValue(true);
    render(<GameCard game={mockGame} />);

    fireEvent.click(screen.getByRole("button", { name: "REMOVE" }));
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockGame.id);
  });
});
