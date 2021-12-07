import { useEffect, useState, VFC } from "react";
import Pagination from "react-bootstrap/Pagination";
import { PaginationLink, PaginationLinks, UsersResponse } from "../../Models";
import { SubscribeToCallback, UnsubscribeFn } from "../../api/utils";

export interface PaginatorProps {
  subscribeToPaginationLinks(
    callback: SubscribeToCallback<PaginationLinks>
  ): UnsubscribeFn;
  onPageClick(link: string): void;
}
export const Paginator: VFC<PaginatorProps> = ({
  onPageClick,
  subscribeToPaginationLinks,
}) => {
  const [paginationLinks, setPaginationLinks] = useState<PaginationLinks>();

  // subscribe to paginationLinks
  useEffect(() => {
    return subscribeToPaginationLinks(setPaginationLinks);
  }, []);

  const clickHandler = (link?: string) => () => link && onPageClick(link);
  return !paginationLinks ? null : (
    <>
      <Pagination aria-label="pagination" size="lg">
        <Pagination.First
          disabled={!paginationLinks?.first}
          onClick={clickHandler(paginationLinks?.first)}
        />
        <Pagination.Prev
          disabled={!paginationLinks?.prev}
          onClick={clickHandler(paginationLinks?.prev)}
        />
        <Pagination.Next
          disabled={!paginationLinks?.next}
          onClick={clickHandler(paginationLinks?.next)}
        />
        <Pagination.Last
          disabled={!paginationLinks?.last}
          onClick={clickHandler(paginationLinks?.last)}
        />
      </Pagination>
    </>
  );
};
