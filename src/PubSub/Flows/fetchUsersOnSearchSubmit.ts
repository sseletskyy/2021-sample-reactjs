import { fetchUsersBySearchString } from "../../api/users";
import { broadcastNotification, broadcastUsersResponse } from "../index";
import { broadcastOnFetch, BroadcastOnFetchProps } from "./utils";
import { UsersResponse } from "../../Models";

const props: BroadcastOnFetchProps<string, UsersResponse> = {
  fetchFn(data: string): Promise<UsersResponse> {
    return fetchUsersBySearchString(data);
  },
  broadcastOnSuccess(data: UsersResponse) {
    broadcastUsersResponse(data);
  },
  broadcastOnError(data: unknown) {
    broadcastNotification({
      mode: "error",
      message: String(data),
    });
  },
};
export const fetchUsersOnSearchSubmit = broadcastOnFetch<string, UsersResponse>(
  props
);
