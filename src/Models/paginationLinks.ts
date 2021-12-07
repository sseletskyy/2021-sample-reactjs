export interface PaginationLinks {
  first?: string;
  last?: string;
  next?: string;
  prev?: string;
}

export type PaginationLink = keyof PaginationLinks;
