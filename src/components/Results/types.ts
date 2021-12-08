import { User, UsersResponse } from "../../Models";
import { SubscribeToCallback, UnsubscribeFn } from "../../api/utils";

export type SortOrder = "asc" | "desc";
export type SortField = keyof User;
export interface Sorting {
  field: SortField;
  order: SortOrder;
}

export interface ResultsProps {
  subscribeToUsers(callback: SubscribeToCallback<UsersResponse>): UnsubscribeFn;
}
