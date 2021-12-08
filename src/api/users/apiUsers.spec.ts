import {
  convertApiResponse,
  getFetchUsersUrl,
  parseHeaderLink,
  PER_PAGE,
} from "./index";
import {
  ApiUser,
  ApiUsersResponse,
  PaginationLinks,
  UsersResponse,
} from "../../Models";

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
        headerLink: null
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
  describe("parseHeaderLink", () => {
    const linkNextAndLast = `<https://api.github.com/search/users?q=test+in%3Alogin&per_page=9&page=2>; rel="next", <https://api.github.com/search/users?q=test+in%3Alogin&per_page=9&page=112>; rel="last"`;
    const linkAll = `<https://api.github.com/search/code?q=addClass+user%3Amozilla&page=13>; rel="prev", <https://api.github.com/search/code?q=addClass+user%3Amozilla&page=15>; rel="next", <https://api.github.com/search/code?q=addClass+user%3Amozilla&page=34>; rel="last", <https://api.github.com/search/code?q=addClass+user%3Amozilla&page=1>; rel="first"`;

    describe("when input contains next and last values", () => {
      it("should return object with keys next and last", () => {
        const actual = parseHeaderLink(linkNextAndLast);
        const expected = {
          last: "https://api.github.com/search/users?q=test+in%3Alogin&per_page=9&page=112",
          next: "https://api.github.com/search/users?q=test+in%3Alogin&per_page=9&page=2",
        };
        expect(actual).toEqual(expected);
      });
    });
    describe("when input contains all values", () => {
      it("should return full object", () => {
        const actual = parseHeaderLink(linkAll);
        const expected: PaginationLinks = {
          first:
            "https://api.github.com/search/code?q=addClass+user%3Amozilla&page=1",
          last: "https://api.github.com/search/code?q=addClass+user%3Amozilla&page=34",
          next: "https://api.github.com/search/code?q=addClass+user%3Amozilla&page=15",
          prev: "https://api.github.com/search/code?q=addClass+user%3Amozilla&page=13",
        };
        expect(actual).toEqual(expected);
      });
    });
  });
});
