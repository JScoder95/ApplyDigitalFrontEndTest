import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SeeMoreButton from "./SeeMoreButton";
import { useRouter, useSearchParams } from "next/navigation";
import "@testing-library/jest-dom";

// Mock for useRouter and useSearchParams
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("SeeMoreButton component", () => {
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

  test("renders button when currentPage is less than totalPages", () => {
    render(<SeeMoreButton currentPage={1} totalPages={2} />);
    expect(
      screen.getByRole("button", { name: "SEE MORE" })
    ).toBeInTheDocument();
  });

  test("does not render button when currentPage is equal to totalPages", () => {
    render(<SeeMoreButton currentPage={2} totalPages={2} />);
    expect(screen.queryByRole("button", { name: "SEE MORE" })).toBeNull();
  });

  test("updates search params and navigates to next page when button is clicked", () => {
    render(<SeeMoreButton currentPage={1} totalPages={3} />);
    fireEvent.click(screen.getByRole("button", { name: "SEE MORE" }));

    expect(mockSearchParams.toString).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith(
      expect.stringContaining("page=2")
    );
  });

  test("uses existing search params and increments page", () => {
    mockSearchParams.toString.mockReturnValue("genre=action&page=1");
    render(<SeeMoreButton currentPage={1} totalPages={3} />);
    fireEvent.click(screen.getByRole("button", { name: "SEE MORE" }));

    expect(mockRouterPush).toHaveBeenCalledWith(
      expect.stringContaining("genre=action&page=2")
    );
  });
});
