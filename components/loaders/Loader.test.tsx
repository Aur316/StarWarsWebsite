import { render, screen } from "@testing-library/react";
import Loader from "./Loader";
import "@testing-library/jest-dom";

describe("Loader", () => {
  it("renders Loader component", () => {
    render(<Loader />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
