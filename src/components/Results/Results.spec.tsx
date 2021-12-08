import { Results } from "./Results";
import { fireEvent, render } from "@testing-library/react";
import { subscribeToUsersMock, usersResponseMock } from "./mock.data";
import { ResultsProps } from "./types";

const getTextContentForColumn = (list: NodeListOf<Element>): string[] =>
  Array.from(list).map((el) => (el.textContent || "").trim());

const getFirstColumnContent = (tbody: HTMLTableSectionElement): string[] =>
  getTextContentForColumn(tbody.querySelectorAll("tr td:first-child"));

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
    const columnSortLinks: NodeListOf<HTMLAnchorElement> =
      container.querySelectorAll("thead tr th a");
    const tbody = container.querySelector("tbody");
    return {
      container,
      table,
      tbody,
      thead,
      columnSortLinks,
    };
  };
  it("should render nothing by default", () => {
    const { table } = setup();
    expect(table).toBeFalsy();
  });
  describe("when subscribeToUsers method returns data", () => {
    let setupProps: ReturnType<typeof setup>;
    beforeEach(() => {
      setupProps = setup({
        subscribeToUsers: subscribeToUsersMock,
      });
    });
    it("should render thead and tbody", () => {
      const { thead, tbody } = setupProps;
      // check one row in thead
      const trElements = thead?.querySelectorAll("tr");
      expect(trElements?.length).toEqual(1);
      // check three columns in the row
      const thElements = thead?.querySelectorAll("th");
      expect(thElements?.length).toEqual(3);

      expect(tbody).toBeTruthy();
      expect(tbody?.children?.length).toEqual(usersResponseMock.items.length);
    });
    it("should render a link in each column header", () => {
      const { columnSortLinks } = setupProps;
      expect(columnSortLinks.length).toEqual(3);
    });

    describe("when user clicks on avatar url (first) column", () => {
      it("should resort rows respectively", () => {
        // pre assert
        const { tbody, columnSortLinks } = setupProps;
        const beforeColumnData = getFirstColumnContent(tbody!);

        expect(beforeColumnData).toEqual([
          "https://www.a.b.c",
          "https://company.com",
        ]);

        // act
        fireEvent.click(columnSortLinks[0]);

        // assert
        const afterColumnData = getFirstColumnContent(tbody!);
        expect(afterColumnData).toEqual([
          "https://company.com",
          "https://www.a.b.c",
        ]);

        // act - second click should sort in desc order
        fireEvent.click(columnSortLinks[0]);

        // assert
        const afterSecondClickColumnData = getFirstColumnContent(tbody!);
        expect(afterSecondClickColumnData).toEqual([
          "https://www.a.b.c",
          "https://company.com",
        ]);
      });
    });
  });
});
