import { fetchUsers, fetchUsersBySearchString } from "../../api/users";
import {
  broadcastApiFetching,
  broadcastNotification,
  broadcastPaginationLinks,
  broadcastUsersResponse,
} from "../index";
import { broadcastOnFetch, BroadcastOnFetchProps } from "./utils";
import { UsersAndLinks } from "../../Models/users";

const timestamp = (): string => new Date().toLocaleTimeString();

const broadcastOnSuccess: BroadcastOnFetchProps<
  string,
  UsersAndLinks
>["broadcastOnSuccess"] = ({ usersResponse, paginationLinks }) => {
  // console.log(`Broadcast on Success`, usersResponse, paginationLinks);
  broadcastUsersResponse(usersResponse);
  broadcastPaginationLinks(paginationLinks);
  broadcastApiFetching(false);
};

const broadcastOnError: BroadcastOnFetchProps<
  string,
  UsersAndLinks
>["broadcastOnError"] = (data) => {
  broadcastNotification({
    mode: "error",
    message: `${timestamp()}: Request to get search results failed: ${String(
      data
    )}`,
  });
  broadcastApiFetching(false);
};

const onSearchSubmitProps: BroadcastOnFetchProps<string, UsersAndLinks> = {
  fetchFn(data: string): Promise<UsersAndLinks> {
    broadcastApiFetching(true);
    return fetchUsersBySearchString(data);
  },
  broadcastOnSuccess,
  broadcastOnError,
};

export const fetchUsersOnSearchSubmit = broadcastOnFetch<string, UsersAndLinks>(
  onSearchSubmitProps
);

const onPageClickProps: BroadcastOnFetchProps<string, UsersAndLinks> = {
  fetchFn(data: string): Promise<UsersAndLinks> {
    broadcastApiFetching(true);
    return fetchUsers(data);
  },
  broadcastOnSuccess,
  broadcastOnError,
};

export const fetchUsersOnPageClick = broadcastOnFetch<string, UsersAndLinks>(
  onPageClickProps
);
