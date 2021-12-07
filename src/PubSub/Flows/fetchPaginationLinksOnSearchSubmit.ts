import { fetchPaginationLinksBySearchString } from "../../api/users";
import { broadcastNotification, broadcastPaginationLinks } from "../index";
import { broadcastOnFetch, BroadcastOnFetchProps } from "./utils";
import { PaginationLinks } from "../../Models";

const props: BroadcastOnFetchProps<string, PaginationLinks> = {
  fetchFn(data): Promise<PaginationLinks> {
    return fetchPaginationLinksBySearchString(data);
  },
  broadcastOnSuccess(data) {
    broadcastPaginationLinks(data);
  },
  broadcastOnError(data) {
    broadcastNotification({
      mode: "error",
      message: `Request to get pagination links failed: ${String(data)}`,
    });
  },
};
export const fetchPaginationLinksOnSearchSubmit = broadcastOnFetch<
  string,
  PaginationLinks
>(props);
