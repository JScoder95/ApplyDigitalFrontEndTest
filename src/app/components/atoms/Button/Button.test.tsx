import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom";

describe("Button component", () => {
  test("renders the button with children", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click Me");
  });

  test("applies default classes", () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "font-bold transition-colors focus:outline-none tracking-[0.5px] leading-none"
    );
  });

  test("applies variant classes", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    let button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary text-white hover:bg-primary/90");

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass(
      "bg-secondary text-primary hover:bg-secondary/90"
    );

    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass(
      "bg-transparent border border-primary text-primary hover:bg-primary/10"
    );

    rerender(<Button variant="cart">Cart</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass(
      "bg-transparent border border-primary primary hover:bg-gray-50"
    );
  });

  test("applies size classes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let button = screen.getByRole("button");
    expect(button).toHaveClass("px-3 py-1 text-sm");

    rerender(<Button size="md">Medium</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("px-4 py-2 text-base");

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("px-6 py-4 text-base");
  });

  test("applies fullWidth class", () => {
    const { rerender } = render(<Button fullWidth>Full Width</Button>);
    let button = screen.getByRole("button");
    expect(button).toHaveClass("w-full");

    rerender(<Button fullWidth={false}>Not Full Width</Button>);
    button = screen.getByRole("button");
    expect(button).not.toHaveClass("w-full");
  });

  test("applies additional class names", () => {
    render(<Button className="extra-class">Button with Extra Class</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("extra-class");
  });

  test("supports all button attributes", () => {
    render(
      <Button type="submit" disabled>
        Submit
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
  });
});
