import type { AuthToken } from "@schema/user";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: AuthToken | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type Nullish<T> = T | null | undefined;
	type LooseObject<T> = {
		[P in keyof T]?: Nullish<T[P]>
	}
	type StrictObject<T> = {
		[P in keyof T]-?: NonNullable<T[P]>
	}
}

export {};
