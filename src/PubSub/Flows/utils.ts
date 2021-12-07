export interface BroadcastOnFetchProps<Request, Response> {
  fetchFn(data: Request): Promise<Response>;
  broadcastOnSuccess(data: Response): void;
  broadcastOnError(data: unknown): void;
}

export type BroadcastOnFetchReturn<T> = (request: T) => void;
export function broadcastOnFetch<Request, Response>({
  fetchFn,
  broadcastOnSuccess,
  broadcastOnError,
}: BroadcastOnFetchProps<Request, Response>): BroadcastOnFetchReturn<Request> {
  return async (request) => {
    try {
      const response = await fetchFn(request);
      broadcastOnSuccess(response);
    } catch (e) {
      broadcastOnError(e);
    }
  };
}
