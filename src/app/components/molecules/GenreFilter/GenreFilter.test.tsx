import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GenreFilter from "./GenreFilter";
import { useRouter, useSearchParams } from "next/navigation";
import "@testing-library/jest-dom";

// Mock for useRouter and useSearchParams
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("GenreFilter component", () => {
  const mockGenres = ["Action", "Adventure", "RPG"];
  const mockRouterPush = jest.fn();
  const mockSearchParams = {
    get: jest.fn(),
    toString: jest.fn(() => ""),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    mockRouterPush.mockClear();
    mockSearchParams.get.mockClear();
    mockSearchParams.toString.mockClear();
  });

  test("renders genre options correctly", () => {
    render(<GenreFilter genres={mockGenres} />);

    expect(screen.getByText("Genre")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    mockGenres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  test("displays selected genre from search params", () => {
    mockSearchParams.get.mockReturnValue("Adventure");
    render(<GenreFilter genres={mockGenres} />);

    expect((screen.getByRole("combobox") as HTMLSelectElement).value).toBe(
      "Adventure"
    );
  });

  test("updates search params when genre is changed", () => {
    render(<GenreFilter genres={mockGenres} />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "RPG" },
    });

    expect(mockSearchParams.toString).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalled();
  });

  test("resets page to 1 when genre is changed", () => {
    render(<GenreFilter genres={mockGenres} />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "RPG" },
    });

    expect(mockRouterPush).toHaveBeenCalledWith(
      expect.stringContaining("page=1")
    );
  });

  test("removes genre parameter when 'All' is selected", () => {
    mockSearchParams.get.mockReturnValue("Adventure");
    render(<GenreFilter genres={mockGenres} />);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "" } });

    expect(mockSearchParams.toString).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith(
      expect.not.stringContaining("genre=")
    );
  });
});
