import { pipe } from "fp-ts/function";
import * as S from "fp-ts/string";
import * as A from "fp-ts/Array";
import {
  ApiUser,
  ApiUsersResponse,
  PaginationLinks,
  User,
  UsersResponse,
} from "../../Models";

export const PER_PAGE = 9;

export const getFetchUsersUrl = (login: string): string =>
  `https://api.github.com/search/users?q=${login}+in:login&per_page=${PER_PAGE}`;

const convertApiUser = ({ login, id, avatar_url, type }: ApiUser): User => ({
  id,
  login,
  type,
  avatarUrl: avatar_url,
});

export const convertApiResponse = ({
  incomplete_results,
  total_count,
  items,
}: ApiUsersResponse): UsersResponse => ({
  incompleteResults: incomplete_results,
  totalCount: total_count,
  items: items.map(convertApiUser),
});

export const fetchUsers = (url: string): Promise<UsersResponse> =>
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if (response.message) {
        throw response.message;
      } else {
        return response;
      }
    })
    .then(convertApiResponse);

export const fetchUsersBySearchString = (searchString: string) =>
  fetchUsers(getFetchUsersUrl(searchString));

export const parseHeaderLink = (link: string): PaginationLinks => {
  //  const ary = (link);
  return pipe(
    link,
    // @ts-expect-error suppress ReadonlyNonEmptyArray mismatch array
    S.split(" "),
    // split array into pairs [raw-url, raw-rel]
    A.reduce<string, string[][]>([], (acc, next: string) => {
      const lastPair = acc.pop() || [];
      if (lastPair.length < 2) {
        lastPair.push(next); // add second element to a pair
        acc.push(lastPair); // push back lastPair
      } else {
        acc.push(lastPair); // push back lastPair
        acc.push([next]); // and push a new pair
      }
      return acc;
    }),
    // convert raw-url and raw-rel to url and rel
    A.map(([first, second]) => {
      const url = pipe(
        first,
        S.split(">"),
        (x) => x[0], // remove '>;'
        S.split("<"),
        (x) => x[1] // remove '<'
      );
      const rel = pipe(
        second,
        S.split('"'),
        (x) => x[1] // trim double quotes
      );
      return [url, rel];
    }),
    // convert to PaginationLinks
    A.reduce<[string, string], PaginationLinks>(
      {} as PaginationLinks,
      (acc, [url, rel]) => ((acc[rel as keyof PaginationLinks] = url), acc)
    )
  );
};

export const fetchPaginationLinks = (url: string): Promise<PaginationLinks> =>
  fetch(url, { method: "HEAD" })
    .then((response) =>
      pipe(
        response,
        (r) => r.headers.get("link"),
        (link) => (link ? parseHeaderLink(link) : null)
      )
    )
    .then((response) => {
      if (response === null) {
        throw `error`;
      }
      return response;
    });

export const fetchPaginationLinksBySearchString = (searchString: string) =>
  fetchPaginationLinks(getFetchUsersUrl(searchString));
