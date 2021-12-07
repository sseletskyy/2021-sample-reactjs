import { broadcastOnFetch, BroadcastOnFetchProps } from "./utils";
import { UsersResponse } from "../../Models";
import { usersResponseMock } from "../../components/Results/mock.data";

describe("broadcastOnFetch", () => {
  describe("when fetch fails", () => {
    it("should trigger broadcastOnError", async () => {
      // arrange
      const serverErrorMessage = "Server is unavailable";
      const broadcastOnSuccessMock = jest.fn();
      const broadcastOnErrorMock = jest.fn();
      const props: BroadcastOnFetchProps<string, UsersResponse> = {
        fetchFn(): Promise<UsersResponse> {
          return new Promise<UsersResponse>((_, reject) => {
            reject(serverErrorMessage);
          });
          // or throw serverErrorMessage;
        },
        broadcastOnSuccess(data: UsersResponse) {
          broadcastOnSuccessMock(data);
        },
        broadcastOnError(data: unknown) {
          broadcastOnErrorMock({
            mode: "error",
            message: String(data),
          });
        },
      };

      // act
      await broadcastOnFetch<string, UsersResponse>(props)("test");

      // assert
      expect(broadcastOnSuccessMock).toHaveBeenCalledTimes(0);
      expect(broadcastOnErrorMock).toHaveBeenCalledTimes(1);
      expect(broadcastOnErrorMock).toHaveBeenLastCalledWith({
        mode: "error",
        message: serverErrorMessage,
      });
    });
  });
  describe("when fetch returns data", () => {
    it("should trigger broadcastOnSuccess", async () => {
      // arrange
      const broadcastOnSuccessMock = jest.fn();
      const broadcastOnErrorMock = jest.fn();
      const props: BroadcastOnFetchProps<string, UsersResponse> = {
        fetchFn(): Promise<UsersResponse> {
          return new Promise<UsersResponse>((resolve) => {
            resolve(usersResponseMock);
          });
        },
        broadcastOnSuccess(data: UsersResponse) {
          broadcastOnSuccessMock(data);
        },
        broadcastOnError(data: unknown) {
          broadcastOnErrorMock({
            mode: "error",
            message: String(data),
          });
        },
      };

      // act
      await broadcastOnFetch<string, UsersResponse>(props)("test");

      // assert
      expect(broadcastOnSuccessMock).toHaveBeenCalledTimes(1);
      expect(broadcastOnErrorMock).toHaveBeenCalledTimes(0);
      expect(broadcastOnSuccessMock).toHaveBeenLastCalledWith(
        usersResponseMock
      );
    });
  });
});
