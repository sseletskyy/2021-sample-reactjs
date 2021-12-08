import { UsersResponse } from "../../Models";
import { ResultsProps } from "./types";

export const usersResponseMock: UsersResponse = {
  totalCount: 2,
  incompleteResults: false,
  items: [
    {
      id: 1,
      login: "a",
      type: "user",
      avatarUrl: "https://www.a.b.c",
    },
    {
      id: 2,
      login: "b",
      type: "company",
      avatarUrl: "https://company.com",
    },
  ],
};
export const subscribeToUsersMock: ResultsProps["subscribeToUsers"] = (
  callback
) => {
  callback(usersResponseMock);
  return () => {};
};
