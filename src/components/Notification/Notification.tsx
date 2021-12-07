import React, { useEffect, useState, VFC } from "react";
import { SubscribeToCallback, UnsubscribeFn } from "../../api/utils";
import { Notification } from "../../Models";

const CLEAR_DELAY = 7000;

export interface NotificationComponentProps {
  subscribeToNotification(
    callback: SubscribeToCallback<Notification>
  ): UnsubscribeFn;
  clearDelay?: number;
}

export const NotificationComponent: VFC<NotificationComponentProps> = ({
  subscribeToNotification,
  clearDelay = CLEAR_DELAY,
}) => {
  const [notification, setNotification] = useState<Notification>();

  useEffect(() => {
    return subscribeToNotification(setNotification);
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(undefined);
      }, clearDelay);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div
      className="mb-2 notification-container w-100 overflow-auto"
      style={{ height: 100 }}
    >
      {notification && (
        <div
          className={`notification-item ${
            notification.mode === "error" && `text-warning bg-dark`
          }`}
        >
          <p className="p-2">{notification.message}</p>
        </div>
      )}
    </div>
  );
};
