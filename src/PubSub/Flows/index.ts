import { fetchUsersOnPageClick, fetchUsersOnSearchSubmit } from "./fetchUsers";
import {
  fetchPaginationLinksOnPageClick,
  fetchPaginationLinksOnSearchSubmit,
} from "./fetchPaginationLinks";
import { BroadcastOnFetchReturn } from "./utils";

// helper method to call an array of flows in the sequence
// Request type should be the same for all flows in the array
function callFlows<Request>(fns: BroadcastOnFetchReturn<Request>[]) {
  return (request: Request) => {
    fns.forEach((fn) => fn(request));
  };
}

export const fetchUsersAndPaginationLinksOnSearch = callFlows<string>([
  fetchUsersOnSearchSubmit,
  fetchPaginationLinksOnSearchSubmit,
]);

export const fetchUsersAndPaginationLinksOnPageClick = callFlows<string>([
  fetchUsersOnPageClick,
  fetchPaginationLinksOnPageClick,
]);
