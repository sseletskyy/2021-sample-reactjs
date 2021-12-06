import React, { VFC } from "react";

export const searchContainerTestId = "search-container";
export const Search: VFC = () => {
  return <div data-testid={searchContainerTestId}>Search</div>;
};
