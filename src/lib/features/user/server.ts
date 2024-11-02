import type { User } from "@interfaces";
import type { AuthToken, SignUpData } from "@auth/schema";
import auth from "@auth/server";
import e, { getClient } from "@db";
import { useAwait } from "$lib";

export type CurrentUser = Pick<User, "id" | "display_name" | "name">;

export function buildUserRelationQuery(currentUser: AuthToken) {
  return e.select(e.User, () => ({
    id: true,
    filter_single: { id: currentUser.id }
  }));
}

export function findCurrentUser(id: string) {
  return useAwait<CurrentUser | null, unknown>(() => {
    return e.select(e.User, () => ({
      id: true,
      name: true,
      display_name: true,
      filter_single: { id }
    })).run(getClient());
  });
}

export function findUserByEmail(email: string) {
  return useAwait(() => {
    return e.select(e.User, () => ({
      id: true,
      name: true,
      display_name: true,
      email: true,
      encrypted_password: true,
      refresh_token_version: true,
      created_at: true,
      filter_single: { email }
    })).run(getClient());
  });
}

export function createUser(data: SignUpData) {
  return useAwait(async () => {
    return e.insert(e.User, {
      name: data.name,
      display_name: data["display-name"],
      email: data.email,
      encrypted_password: await auth.bcrypt.hash(data.password),
    }).run(getClient());
  });
}

export function hasPasswordMatch(password: string, encrypted_password: string) {
  return auth.bcrypt.compare(password, encrypted_password);
}