import { Results, ResultsProps } from "./Results";
import { render } from "@testing-library/react";
import { subscribeToUsersMock, usersResponseMock } from "./mock.data";

describe("ResultsComponent", () => {
  const defaultProps: ResultsProps = {
    subscribeToUsers: () => () => {},
  };
  const setup = (overrideProps?: Partial<ResultsProps>) => {
    const props: ResultsProps = {
      ...defaultProps,
      ...(overrideProps || {}),
    };
    const { container } = render(<Results {...props} />);
    const table = container.querySelector("table");
    const thead = container.querySelector("thead");
    const tbody = container.querySelector("tbody");
    return {
      container,
      table,
      tbody,
      thead,
    };
  };
  it("should render nothing by default", () => {
    const { table } = setup();
    expect(table).toBeFalsy();
  });
  describe("when subscribeToUsers method returns data", () => {
    it("should render thead and tbody", () => {
      const { thead, tbody } = setup({
        subscribeToUsers: subscribeToUsersMock,
      });
      // check one row in thead
      const trElements = thead?.querySelectorAll("tr");
      expect(trElements?.length).toEqual(1);
      // check three columns in the row
      const thElements = thead?.querySelectorAll("th");
      expect(thElements?.length).toEqual(3);

      expect(tbody).toBeTruthy();
      expect(tbody?.children?.length).toEqual(usersResponseMock.items.length);
    });
  });
});
