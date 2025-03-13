import React from "react";
import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

// Mock for SeeMoreButton
jest.mock("../SeeMoreButton/SeeMoreButton", () => ({
  __esModule: true,
  default: ({ currentPage, totalPages }: any) => (
    <div data-testid="see-more-button">
      See More - Current: {currentPage}, Total: {totalPages}
    </div>
  ),
}));

describe("Pagination component", () => {
  test("renders SeeMoreButton with correct props", () => {
    const currentPage = 3;
    const totalPages = 10;

    render(<Pagination currentPage={currentPage} totalPages={totalPages} />);

    const seeMoreButton = screen.getByTestId("see-more-button");
    expect(seeMoreButton).toHaveTextContent(
      `See More - Current: ${currentPage}, Total: ${totalPages}`
    );
  });

  test("renders SeeMoreButton with different props", () => {
    const currentPage = 1;
    const totalPages = 5;

    render(<Pagination currentPage={currentPage} totalPages={totalPages} />);

    const seeMoreButton = screen.getByTestId("see-more-button");
    expect(seeMoreButton).toHaveTextContent(
      `See More - Current: ${currentPage}, Total: ${totalPages}`
    );
  });
});
