import React from "react";
import { render, screen } from "@testing-library/react";
import GameGrid from "./GameGrid";

// Mock the component
jest.mock("@/app/components/molecules/GameCard/GameCard", () => ({
  __esModule: true,
  default: ({ game }: any) => (
    <div data-testid={`game-card-${game.id}`}>
      {game.name} - {game.price}
    </div>
  ),
}));

type Game = {
  id: string;
  name: string;
  price: number;
  genre: string;
  image: string;
  description: string;
  isNew: boolean;
};

describe("GameGrid component", () => {
  const mockGames: Game[] = [
    {
      id: "1",
      name: "Game 1",
      price: 50,
      genre: "Action",
      image: "/game1.jpg",
      description: "An action-packed game",
      isNew: false,
    },
    {
      id: "2",
      name: "Game 2",
      price: 30,
      genre: "Adventure",
      image: "/game2.jpg",
      description: "An adventurous game",
      isNew: true,
    },
    {
      id: "3",
      name: "Game 3",
      price: 70,
      genre: "Strategy",
      image: "/game3.jpg",
      description: "A strategic game",
      isNew: false,
    },
  ];

  test("renders GameCard for each game in the list", () => {
    render(<GameGrid games={mockGames} />);

    mockGames.forEach((game) => {
      expect(screen.getByTestId(`game-card-${game.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`game-card-${game.id}`)).toHaveTextContent(
        `${game.name} - ${game.price}`
      );
    });
  });

  test("renders correct number of GameCards", () => {
    render(<GameGrid games={mockGames} />);
    expect(screen.getAllByTestId(/game-card-/)).toHaveLength(mockGames.length);
  });

  test("renders empty grid when no games are provided", () => {
    render(<GameGrid games={[]} />);
    expect(screen.queryByTestId(/game-card-/)).toBeNull();
  });
});
