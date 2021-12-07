import { broadcastSearchSubmit, subscribeToSearchSubmit } from "./index";
import { UnsubscribeFn } from "../api/utils";

describe("PubSub", () => {
  describe("submitSearch", () => {
    let subscriptions: UnsubscribeFn[] = [];
    afterEach(() => {
      subscriptions.map((fn) => fn?.());
    });
    it("should broadcast value to all subscribers", () => {
      // arrange
      const searchValueFirst = "abc";
      const searchValueSecond = "def";
      const subscribeCallbackOne = jest.fn();
      const subscribeCallbackTwo = jest.fn();

      subscriptions.push(subscribeToSearchSubmit(subscribeCallbackOne));
      subscriptions.push(subscribeToSearchSubmit(subscribeCallbackTwo));

      // act
      broadcastSearchSubmit(searchValueFirst);
      // stop second listener
      subscriptions.pop()?.();
      broadcastSearchSubmit(searchValueSecond);

      // assert
      expect(subscribeCallbackOne).toHaveBeenCalledTimes(2);
      expect(subscribeCallbackTwo).toHaveBeenCalledTimes(1);

      expect(subscribeCallbackOne).toHaveBeenLastCalledWith(searchValueSecond);
      expect(subscribeCallbackTwo).toHaveBeenLastCalledWith(searchValueFirst);
    });
  });
});
