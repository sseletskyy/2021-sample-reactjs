import React, { useEffect, useState, VFC } from "react";
import Table from "react-bootstrap/Table";
import { User, UsersResponse } from "../../Models";
import { SubscribeToCallback, UnsubscribeFn } from "../../api/utils";
import { usersResponseMock } from "./mock.data";

export interface ResultsProps {
  subscribeToUsers(callback: SubscribeToCallback<UsersResponse>): UnsubscribeFn;
}
export const Results: VFC<ResultsProps> = ({ subscribeToUsers }) => {
  const [usersResponse, setUsersResponse] = useState<UsersResponse>();

  // subscribe to users
  useEffect(() => {
    return subscribeToUsers(setUsersResponse);
  }, []);

  const renderUser = (user: User) => (
    <tr key={user.id}>
      <td> {user.avatarUrl} </td>
      <td> {user.login} </td>
      <td> {user.type} </td>
    </tr>
  );
  return !usersResponse ? null : (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th>avatar url</th>
          <th>login</th>
          <th>type</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(usersResponse?.items) &&
          usersResponse?.items?.map(renderUser)}
      </tbody>
    </Table>
  );
};
