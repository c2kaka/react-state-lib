import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";

type Subscribe = Parameters<typeof useSyncExternalStoreWithSelector>[0];

type GetState<T> = () => T;

type SetState<T> = (
  partial: T | Partial<T> | ((state: T) => Partial<T> | T),
) => void;

type StoreApi<T> = {
  setState: SetState<T>;
  getState: GetState<T>;
  subscribe: Subscribe;
};

type CreateState<T> = (setState: SetState<T>) => T;

type EqualityFn<T> = (a: T, b: T) => boolean;

const createStore = <T>(createState: CreateState<T>): StoreApi<T> => {
  const listeners = new Set<() => void>();
  let state: T;
  const getState: GetState<T> = () => state;
  const setState: SetState<T> = (partial) => {
    const nextState =
      typeof partial === "function"
        ? (partial as (state: T) => T)(state)
        : partial;
    if (!Object.is(state, nextState)) {
      state =
        typeof nextState !== "object" || nextState === null
          ? (nextState as T)
          : { ...state, ...nextState };
      listeners.forEach((listener) => listener());
    }
  };
  const subscribe: Subscribe = (subscribe) => {
    listeners.add(subscribe);
    return () => listeners.delete(subscribe);
  };
  const api: StoreApi<T> = { getState, setState, subscribe };
  state = createState(setState);
  return api;
};

const useStore = <State, StateSlice>(
  api: StoreApi<State>,
  selector: (state: State) => StateSlice = api.getState as any,
  equalityFn?: EqualityFn<StateSlice>,
) => {
  return useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getState,
    selector,
    equalityFn,
  );
};

export const create = <T>(createState: CreateState<T>) => {
  const api = createStore(createState);
  return <TSlice = T>(
    selector?: (state: T) => TSlice,
    equalityFn?: EqualityFn<TSlice>,
  ) => useStore<T, TSlice>(api, selector, equalityFn);
};
