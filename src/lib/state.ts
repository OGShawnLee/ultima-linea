import type { CurrentUser } from "@db";
import { createGlobalState } from "$lib";

export const UserState = createGlobalState<CurrentUser | null>("user");