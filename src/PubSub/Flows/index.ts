import { fetchUsersOnSearchSubmit } from "./fetchUsersOnSearchSubmit";
import { fetchPaginationLinksOnSearchSubmit } from "./fetchPaginationLinksOnSearchSubmit";

export const fetchUsersAndPaginationLinksOnSearch = (request: string) => {
  [fetchUsersOnSearchSubmit, fetchPaginationLinksOnSearchSubmit].forEach((fn) =>
    fn(request)
  );
};
