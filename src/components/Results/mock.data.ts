import { ResultsProps } from "./Results";
import { UsersResponse } from "../../Models";

export const usersResponseMock: UsersResponse = {
  totalCount: 2,
  incompleteResults: false,
  items: [
    {
      id: 1,
      login: "a",
      type: "user",
      avatarUrl: "http://a.b.c",
    },
    {
      id: 2,
      login: "b",
      type: "company",
      avatarUrl: "https://www.company.com",
    },
  ],
};
export const subscribeToUsersMock: ResultsProps["subscribeToUsers"] = (
  callback
) => {
  callback(usersResponseMock);
  return () => {};
};
