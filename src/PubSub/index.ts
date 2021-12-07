import { SubscribeToCallback, UnsubscribeFn } from "../api/utils";

export enum CustomEvents {
  submitSearch = "submitSearch",
}

export interface ACustomEvent<T> extends Event {
  detail?: T;
}

export const broadcastSearchSubmit = (detail: string): void => {
  const event = new CustomEvent<string>(CustomEvents.submitSearch, {
    detail,
  });
  document.dispatchEvent(event);
};

export const subscribeToSearchSubmit = (
  callback: SubscribeToCallback<string>
): UnsubscribeFn => {
  // define listener callback
  const internalCallback = (event: ACustomEvent<string>) => {
    event.detail !== undefined && callback(event.detail);
  };

  // create listener
  document.addEventListener(CustomEvents.submitSearch, internalCallback);

  // clean up listener
  return () => {
    document.removeEventListener(CustomEvents.submitSearch, internalCallback);
  };
};
