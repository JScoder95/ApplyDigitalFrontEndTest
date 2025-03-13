import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

// Mock for link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: any) => (
    <a href={href} data-testid="link-element">
      {children}
    </a>
  ),
}));

// Mock for image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: any) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      data-testid="image-element"
    />
  ),
}));

jest.mock(
  "../../../../../public/game-images/applylogo.png",
  () => "test-file-stub"
);

describe("Footer component", () => {
  test("renders footer with logo and link", () => {
    render(<Footer />);

    const linkElement = screen.getByTestId("link-element");
    const imageElement = screen.getByTestId("image-element");

    expect(linkElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("alt", "Apply Digital Logo");
  });

  test("link redirects to home page", () => {
    render(<Footer />);

    const linkElement = screen.getByTestId("link-element");
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
