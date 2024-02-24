import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropDown from "./DropDown";
import "@testing-library/jest-dom";

describe("DropDown Component", () => {
  const title = "Test DropDown";
  const elements = ["Option 1", "Option 2", "Option 3"];
  const mockOnHover = jest.fn();

  beforeEach(() => {
    render(<DropDown title={title} element={elements} onHover={mockOnHover} />);
  });

  test("renders the dropdown button with correct title", () => {
    expect(screen.getByRole("button")).toHaveTextContent(`${title} ▼`);
  });

  test('displays "No [title] available." when passed an empty array', () => {
    const { rerender } = render(
      <DropDown title={title} element={[]} onHover={mockOnHover} />
    );
    expect(screen.getByText(`No ${title} available.`)).toBeInTheDocument();
  });
});
