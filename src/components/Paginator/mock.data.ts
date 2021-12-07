import { PaginationLinks } from "../../Models";
import { PaginatorProps } from "./Paginator";

export const paginationLinksMock: PaginationLinks = {
  next: `https://api.github.com/search/users?q=vet+in:login&per_page=9&page=4`,
  last: `https://api.github.com/search/users?q=vet+in:login&per_page=9&page=10`,
};

export const subscribeToPaginationLinksMock: PaginatorProps["subscribeToPaginationLinks"] =
  (callback) => {
    callback(paginationLinksMock);
    return () => {};
  };
