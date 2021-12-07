import { SubscribeToCallback, UnsubscribeFn } from "../api/utils";

export enum CustomEvents {
  submitSearch = "submitSearch",
}

export interface ACustomEvent<T> extends Event {
  detail?: T;
}

// generic function to broadcast any custom event
export function broadcastFrom<T>(customEvent: CustomEvents) {
  return (detail: T): void => {
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
