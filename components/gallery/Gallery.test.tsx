import { render, screen } from "@testing-library/react";
import Gallery from "./Gallery";
import "@testing-library/jest-dom";

describe("Gallery", () => {
  it("renders Gallery component", () => {
    render(<Gallery />);
    expect(screen.getByRole("img", { name: /Image 1/i })).toBeInTheDocument();
  });
});
