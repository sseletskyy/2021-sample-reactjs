import { ApiUser, ApiUsersResponse, User, UsersResponse } from "../../Models";

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
    .then(convertApiResponse);

export const fetchUsersByLogin = (login: string) =>
  fetchUsers(getFetchUsersUrl(login));
