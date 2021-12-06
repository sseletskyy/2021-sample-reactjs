import { Search, searchContainerTestId } from "./Search";
import { render, screen } from "@testing-library/react";

const setup = () => {
  render(<Search />);
};
describe("Search", () => {
  it('should render string "Search"', () => {
    // arrange
    setup();
    // act
    const container = screen.getByTestId(searchContainerTestId);
    // assert
    expect(container.textContent).toEqual("Search");
  });
});
