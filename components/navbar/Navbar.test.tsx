import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import "@testing-library/jest-dom";

describe("Navbar", () => {
  it("renders Navbar component", () => {
    render(<Navbar />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
