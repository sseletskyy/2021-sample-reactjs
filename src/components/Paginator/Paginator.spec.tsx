import { Paginator, PaginatorProps } from "./Paginator";
import { fireEvent, render } from "@testing-library/react";
import { PaginationLinks } from "../../Models";

const defaultProps: PaginatorProps = {
  onPageClick() {},
  subscribeToPaginationLinks: () => () => {},
};
interface SetupReturn {
  container: HTMLElement;
  pagination: Element | null;
  items: NodeListOf<HTMLLIElement>;
}
const setup = (overrideProps?: PaginatorProps): SetupReturn => {
  const props: PaginatorProps = {
    ...defaultProps,
    ...(overrideProps || {}),
  };
  const { container } = render(<Paginator {...props} />);
  const pagination = container.querySelector(".pagination");
  const items = container.querySelectorAll("li");
  return { container, pagination, items };
};

describe("Paginator", () => {
  it("should render null by default", () => {
    const { pagination } = setup();
    expect(pagination).toBeFalsy();
  });
  describe("when subscribeToPaginationLinks returns data", () => {
    const mockedLinks: PaginationLinks = {
      first: "first-url",
      prev: "prev-url",
    };
    const onPageLinkClickMock = jest.fn();
    let pagination: Element | null;
    let items: NodeListOf<HTMLLIElement>;
    beforeEach(() => {
      const { pagination: p, items: i } = setup({
        subscribeToPaginationLinks(callback) {
          callback(mockedLinks);
          return () => {};
        },
        onPageClick: onPageLinkClickMock,
      });
      pagination = p;
      items = i;
    });
    it("should render pagination", () => {
      expect(pagination).toBeTruthy();
    });
    it("should render all page links", () => {
      expect(items.length).toEqual(4);
    });
    it("should disable page links which keys are absent in paginationLinks", () => {
      const disabledItems = Array.from(items).filter((item) =>
        item.classList.contains("disabled")
      );
      expect(disabledItems.length).toEqual(2);
    });
    it("when enabled page link is clicked, should trigger onPageClick", () => {
      // arrange
      expect(onPageLinkClickMock).toHaveBeenCalledTimes(0);
      const firstLink = Array.from(items)[0];
      expect(firstLink).toBeTruthy();
      const nestedAOfFirstLink = firstLink.children[0];

      // act
      fireEvent.click(nestedAOfFirstLink);

      // assert
      expect(onPageLinkClickMock).toHaveBeenCalledTimes(1);
      expect(onPageLinkClickMock).toHaveBeenLastCalledWith(mockedLinks.first);
    });
  });
});
