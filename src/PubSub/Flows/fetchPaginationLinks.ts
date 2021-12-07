import {
  fetchPaginationLinks,
  fetchPaginationLinksBySearchString,
} from "../../api/users";
import { broadcastPaginationLinks } from "../index";
import { broadcastOnFetch, BroadcastOnFetchProps } from "./utils";
import { PaginationLinks } from "../../Models";

const broadcastOnError: BroadcastOnFetchProps<
  string,
  PaginationLinks
>["broadcastOnSuccess"] = () => {
  // do nothing
};

const onSearchSubmitProps: BroadcastOnFetchProps<string, PaginationLinks> = {
  fetchFn(data): Promise<PaginationLinks> {
    return fetchPaginationLinksBySearchString(data);
  },
  broadcastOnSuccess(data) {
    broadcastPaginationLinks(data);
  },
  broadcastOnError,
};
export const fetchPaginationLinksOnSearchSubmit = broadcastOnFetch<
  string,
  PaginationLinks
>(onSearchSubmitProps);

const onPageClickProps: BroadcastOnFetchProps<string, PaginationLinks> = {
  fetchFn(data): Promise<PaginationLinks> {
    return fetchPaginationLinks(data);
  },
  broadcastOnSuccess(data) {
    broadcastPaginationLinks(data);
  },
  broadcastOnError,
};
export const fetchPaginationLinksOnPageClick = broadcastOnFetch<
  string,
  PaginationLinks
>(onPageClickProps);
