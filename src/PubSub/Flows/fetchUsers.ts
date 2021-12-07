import { fetchUsers, fetchUsersBySearchString } from "../../api/users";
import { broadcastNotification, broadcastUsersResponse } from "../index";
import { broadcastOnFetch, BroadcastOnFetchProps } from "./utils";
import { UsersResponse } from "../../Models";

const broadcastOnError: BroadcastOnFetchProps<
  string,
  UsersResponse
>["broadcastOnSuccess"] = (data) => {
  broadcastNotification({
    mode: "error",
    message: `Request to get search results failed: ${String(data)}`,
  });
};

const onSearchSubmitProps: BroadcastOnFetchProps<string, UsersResponse> = {
  fetchFn(data: string): Promise<UsersResponse> {
    return fetchUsersBySearchString(data);
  },
  broadcastOnSuccess(data: UsersResponse) {
    broadcastUsersResponse(data);
  },
  broadcastOnError,
};

export const fetchUsersOnSearchSubmit = broadcastOnFetch<string, UsersResponse>(
  onSearchSubmitProps
);

const onPageClickProps: BroadcastOnFetchProps<string, UsersResponse> = {
  fetchFn(data: string): Promise<UsersResponse> {
    return fetchUsers(data);
  },
  broadcastOnSuccess(data: UsersResponse) {
    broadcastUsersResponse(data);
  },
  broadcastOnError,
};

export const fetchUsersOnPageClick = broadcastOnFetch<string, UsersResponse>(
  onPageClickProps
);
