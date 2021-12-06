import { convertApiResponse, getFetchUsersUrl, PER_PAGE } from "./index";
import { ApiUser, ApiUsersResponse, UsersResponse } from "../../Models";

describe("API : Users", () => {
  describe("getFetchUsersUrl", () => {
    it("should return correct url", () => {
      const queryString = "test";
      const actual = getFetchUsersUrl(queryString);
      const expected = `https://api.github.com/search/users?q=${queryString}+in:login&per_page=${PER_PAGE}`;
      expect(actual).toEqual(expected);
    });
  });

  describe("convertApiResponse", () => {
    it("should return UsersResponse", () => {
      const apiResponseMock: ApiUsersResponse = {
        total_count: 1,
        incomplete_results: false,
        items: [
          {
            login: "bla",
            type: "type-a",
            avatar_url: "some://url",
            id: 22,
          } as ApiUser,
        ],
      };
      const actual = convertApiResponse(apiResponseMock);
      const expected: UsersResponse = {
        totalCount: 1,
        incompleteResults: false,
        items: [
          {
            id: 22,
            login: "bla",
            type: "type-a",
            avatarUrl: "some://url",
          },
        ],
      };
      expect(actual).toEqual(expected);
    });
  });
});
