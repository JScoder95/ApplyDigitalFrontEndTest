import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Badge from "./Badge";

describe("Badge Component", () => {
  it("renders with default variant", () => {
    render(<Badge text="Default Badge" />);
    const badgeElement = screen.getByText("Default Badge");
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-primary text-white");
  });

  it('renders with "new" variant', () => {
    render(<Badge text="New Badge" variant="new" />);
    const badgeElement = screen.getByText("New Badge");
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-white text-gray-800");
  });

  it('renders with "secondary" variant', () => {
    render(<Badge text="Secondary Badge" variant="secondary" />);
    const badgeElement = screen.getByText("Secondary Badge");
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-secondary text-white");
  });

  it("applies additional class names", () => {
    render(<Badge text="Custom Badge" className="custom-class" />);
    const badgeElement = screen.getByText("Custom Badge");
    expect(badgeElement).toHaveClass("custom-class");
  });
});
