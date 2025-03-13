import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import CatalogTemplate from "./CatalogTemplate";
import * as gameService from "@/services/gameService";
import { useSearchParams } from "next/navigation";
import GenreFilter from "@/app/components/molecules/GenreFilter/GenreFilter";
import GameGrid from "@/app/components/organisms/GameGrid/GameGrid";
import SeeMoreButton from "@/app/components/molecules/SeeMoreButton/SeeMoreButton";
import Spinner from "@/app/components/atoms/Spinner/Spinner";

// Mock for gameService
jest.mock("@/services/gameService");

// Mock for next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

// Mock for GenreFilter
jest.mock("@/app/components/molecules/GenreFilter/GenreFilter", () => ({
  __esModule: true,
  default: () => <div data-testid="genre-filter-mock">GenreFilter Mock</div>,
}));

// Mock for GameGrid
jest.mock("@/app/components/organisms/GameGrid/GameGrid", () => ({
  __esModule: true,
  default: () => <div data-testid="game-grid-mock">GameGrid Mock</div>,
}));

// Mock for SeeMoreButton
jest.mock("@/app/components/molecules/SeeMoreButton/SeeMoreButton", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="see-more-button-mock">SeeMoreButton Mock</div>
  ),
}));

// Mock for Spinner
jest.mock("@/app/components/atoms/Spinner/Spinner", () => ({
  __esModule: true,
  default: () => <div data-testid="spinner-mock">Spinner Mock</div>,
}));

describe("CatalogTemplate component", () => {
  const mockGamesData = {
    games: [{ id: "1", name: "Game 1", price: 50 }],
    availableFilters: ["Action", "Adventure"],
    totalPages: 3,
    currentPage: 1,
  };

  beforeEach(() => {
    (gameService.fetchGames as jest.Mock).mockResolvedValue(
      Promise.resolve(mockGamesData)
    );
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key) => (key === "page" ? "1" : "")),
    });
  });

  test("renders loading spinner initially", () => {
    render(<CatalogTemplate />);
    expect(screen.getByTestId("spinner-mock")).toBeInTheDocument();
  });

  test("renders game grid and see more button after loading", async () => {
    await act(async () => {
      render(<CatalogTemplate />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("game-grid-mock")).toBeInTheDocument();
      expect(screen.getByTestId("see-more-button-mock")).toBeInTheDocument();
    });
  });

  test("renders genre filter with fetched genres", async () => {
    await act(async () => {
      render(<CatalogTemplate />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("genre-filter-mock")).toBeInTheDocument();
    });
  });

  test("fetches games with correct parameters", async () => {
    await act(async () => {
      render(<CatalogTemplate />);
    });

    await waitFor(() => {
      expect(gameService.fetchGames).toHaveBeenCalledWith("", 1);
    });
  });

  test("handles genre and page parameters from search params", async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key) => (key === "page" ? "2" : "Adventure")),
    });
    await act(async () => {
      render(<CatalogTemplate />);
    });

    await waitFor(() => {
      expect(gameService.fetchGames).toHaveBeenCalledWith("Adventure", 2);
    });
  });
});
