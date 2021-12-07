import { fetchUsersBySearchString } from "../../api/users";
import { broadcastNotification, broadcastUsersResponse } from "../index";

export const fetchUsersOnSearchSubmit = async (searchString: string) => {
  // fetch request
  try {
    const response = await fetchUsersBySearchString(searchString);
    // check if successful
    broadcastUsersResponse(response);
    // broadcast response
  } catch (e) {
    // or broadcast error
    broadcastNotification({
      mode: "error",
      message: String(e),
    });
  }
};
