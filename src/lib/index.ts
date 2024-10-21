import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import { getContext, setContext } from "svelte";

export type Result<Data, Error = unknown> = {
  data: Data,
  failed: false
} | { 
  failed: true, 
  error: Error 
}

export function concat(className: string, additional: string) {
  return additional ? className + " " + additional : className;
}

export function createGlobalState<State>(name: string) {
	return {
		mount(value: State) {
			const state = writable(value);
			return setContext(name, state);
		},
		getContext() {
			return getContext(name) as Writable<State | null>;
		}
	};
}

export function f(input: string, ...args: any[]) {
  return input.replace(/\{(\d+)\}/g, (_, i) => args[i]);
}

export async function useAwait<Data, Error>(fn: () => Promise<Data>): Promise<Result<Data, Error>> {
  try {
    return { data: await fn(), failed: false } as Result<Data, Error>;
  } catch (error) {
    return { failed: true, error } as Result<Data, Error>;
  }
}

export function useCatch<Data, Error>(fn: () => Data): Result<Data, Error> {
  try {
    return { data: fn(), failed: false } as Result<Data, Error>;
  } catch (error) {
    return { failed: true, error } as Result<Data, Error>;
  }
}

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}