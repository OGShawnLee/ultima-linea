import type { CurrentUser } from "@user/server";
import { createGlobalState } from "$lib";

export const UserState = createGlobalState<CurrentUser | null>("user");