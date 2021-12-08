import React, { MouseEvent, ReactNode, useEffect, useState, VFC } from "react";
import Table from "react-bootstrap/Table";
import { User, UsersResponse } from "../../Models";
import { ResultsProps, SortField, Sorting } from "./types";
import { sortUsersBy } from "./utils";

const defaultSorting: Sorting = {
  field: "login",
  order: "asc",
};

export const Results: VFC<ResultsProps> = ({ subscribeToUsers }) => {
  const [usersResponse, setUsersResponse] = useState<UsersResponse>();

  const [sorting, setSorting] = useState<Sorting>(defaultSorting);

  const toggleOrder = () => {
    setSorting(({ order, field }) => ({
      field,
      order: order === "asc" ? "desc" : "asc",
    }));
  };

  const changeSorting = (field: SortField) => {
    setSorting({
      field,
      order: "asc",
    });
  };

  // subscribe to users
  useEffect(() => {
    return subscribeToUsers(setUsersResponse);
  }, []);

  const columnClickHandler =
    (field: keyof User) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      console.log(`clicked on ${field}`);
      if (sorting.field === field) {
        toggleOrder();
      } else {
        changeSorting(field);
      }
    };

  const renderArrow = (linkField: keyof User): ReactNode | null => {
    const { field: sortField, order } = sorting;
    return linkField !== sortField ? null : order === "asc" ? (
      <>&nbsp;&darr;</>
    ) : (
      <>&nbsp;&uarr;</>
    );
  };

  const renderHead = () => (
    <tr>
      <th>
        <a href="#" onClick={columnClickHandler("avatarUrl")}>
          avatar url
        </a>
        {renderArrow("avatarUrl")}
      </th>
      <th>
        <a href="#" onClick={columnClickHandler("login")}>
          login
        </a>
        {renderArrow("login")}
      </th>
      <th>
        <a href="#" onClick={columnClickHandler("type")}>
          type
        </a>
        {renderArrow("type")}
      </th>
    </tr>
  );

  const renderUser = (user: User) => (
    <tr key={user.id}>
      <td> {user.avatarUrl} </td>
      <td> {user.login} </td>
      <td> {user.type} </td>
    </tr>
  );
  return !usersResponse ? null : (
    <Table striped bordered responsive>
      <thead>{renderHead()}</thead>
      <tbody>
        {Array.isArray(usersResponse?.items) &&
          usersResponse.items.sort(sortUsersBy(sorting)).map(renderUser)}
      </tbody>
    </Table>
  );
};
