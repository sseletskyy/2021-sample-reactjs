import { Sorting } from "./types";
import { User } from "../../Models";

export const sortUsersBy =
  ({ field, order }: Sorting) =>
  (a: User, b: User) => {
    const x = a[field] as string;
    const y = b[field] as string;
    const result = x < y ? -1 : x > y ? 1 : 0;
    return order === "asc" ? result : result * -1;
  };
