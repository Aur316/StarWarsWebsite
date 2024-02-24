import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chars from "./Chars";

test("renders Chars component", () => {
  render(<Chars />);
  const linkElement = screen.getByPlaceholderText(/Search by homeworld/i);
  expect(linkElement).toBeInTheDocument();
});
