import { SubscribeToCallback, UnsubscribeFn } from "../api/utils";
import { Notification, PaginationLinks, UsersResponse } from "../Models";

export enum CustomEvents {
  submitSearch = "submitSearch",
  fetchUsers = "fetchUsers",
  notification = "notification",
  fetchPaginationLinks = "fetchPaginationLinks",
}

export interface ACustomEvent<T> extends Event {
  detail?: T;
}

// generic function to broadcast any custom event
export function broadcastFrom<T>(customEvent: CustomEvents) {
  return (detail: T): void => {
    console.log(`Broadcast event [${customEvent}] :: value`, detail);
    const event = new CustomEvent<T>(customEvent, {
      detail,
    });
    document.dispatchEvent(event);
  };
}

// generic function to subscribe to any custom event
export function subscribeTo<T>(customEvent: CustomEvents) {
  return (callback: SubscribeToCallback<T>): UnsubscribeFn => {
    // define listener callback
    const internalCallback = (event: ACustomEvent<T>) => {
      console.log(`Subscribe to event [${customEvent}] :: value`, event.detail);
      event.detail !== undefined && callback(event.detail);
    };

    // create listener
    document.addEventListener(customEvent, internalCallback);

    // clean up listener
    return () => {
      document.removeEventListener(customEvent, internalCallback);
    };
  };
}

export const broadcastSearchSubmit = broadcastFrom<string>(
  CustomEvents.submitSearch
);

export const subscribeToSearchSubmit = subscribeTo<string>(
  CustomEvents.submitSearch
);

export const broadcastUsersResponse = broadcastFrom<UsersResponse>(
  CustomEvents.fetchUsers
);

export const subscribeToUsersResponse = subscribeTo<UsersResponse>(
  CustomEvents.fetchUsers
);

export const broadcastNotification = broadcastFrom<Notification>(
  CustomEvents.notification
);

export const subscribeToNotification = subscribeTo<Notification>(
  CustomEvents.notification
);

export const broadcastPaginationLinks = broadcastFrom<PaginationLinks>(
  CustomEvents.fetchPaginationLinks
);

export const subscribeToPaginationLinks = subscribeTo<PaginationLinks>(
  CustomEvents.fetchPaginationLinks
);
