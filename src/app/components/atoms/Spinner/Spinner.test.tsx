import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";
import "@testing-library/jest-dom";

describe("Spinner component", () => {
  test("renders a spinner with default size and color", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("w-6 h-6");
    expect(spinner).toHaveClass("border-primary");
  });

  test("renders a spinner with small size", () => {
    render(<Spinner size="sm" />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toHaveClass("w-4 h-4");
  });

  test("renders a spinner with large size", () => {
    render(<Spinner size="lg" />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toHaveClass("w-8 h-8");
  });

  test("renders a spinner with white color", () => {
    render(<Spinner color="white" />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toHaveClass("border-white");
  });

  test("applies additional class names", () => {
    render(<Spinner className="extra-class" />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner.parentElement).toHaveClass("extra-class");
  });
});
