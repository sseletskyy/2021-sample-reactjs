import React from "react";
import { render } from "@testing-library/react";
import {
  NotificationComponent,
  NotificationComponentProps,
} from "./Notification";
import { Notification } from "../../Models";

const getNotificationItem = (container: HTMLElement) =>
  container.querySelector(".notification-item");

const CLEAR_DELAY = 1000;
describe("NotificationComponent", () => {
  const defaultProps: NotificationComponentProps = {
    subscribeToNotification: () => () => {},
    clearDelay: CLEAR_DELAY,
  };

  const setup = (props: NotificationComponentProps = defaultProps) => {
    const { container } = render(<NotificationComponent {...props} />);
    const notificationElement = getNotificationItem(container);
    return {
      container,
      notificationElement,
    };
  };

  it("should not show notification by default", () => {
    const { notificationElement } = setup();
    expect(notificationElement).toBeFalsy();
  });

  describe("when subscribeToNotifications returns data", () => {
    let notificationElement: Element | null;
    let container: HTMLElement;
    beforeEach(() => {
      const notification: Notification = {
        mode: "error",
        message: "Too many calls",
      };
      const { notificationElement: nE, container: c } = setup({
        subscribeToNotification(callback) {
          callback(notification);
          return () => {};
        },
        clearDelay: CLEAR_DELAY,
      });
      notificationElement = nE;
      container = c;
    });
    it("should render notification item", () => {
      expect(notificationElement).toBeTruthy();
    });
    it("should clean up notification item after clearDelay milliseconds", (done) => {
      expect(notificationElement).toBeTruthy();
      const callback = () => {
        expect(getNotificationItem(container)).toBeFalsy();
        done();
      };
      setTimeout(callback, CLEAR_DELAY + 500);
    });
  });
});
