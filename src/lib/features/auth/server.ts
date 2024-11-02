import { type AuthToken, AuthTokenSchema } from "@auth/schema";
import { type CurrentUser, findCurrentUser } from "@user/server";
import createAuthClient from "@server/mini-auth";
import e, { getClient } from "@db";
import { ACCESS_COOKIE, ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES_IN, REFRESH_COOKIE, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRES_IN } from "$env/static/private";
import { safeParse } from "valibot";

async function findUserRefreshTokenVersion(id: string) {
	const result = await e.select(e.User, () => ({
		refresh_token_version: true,
		filter_single: { id }
	})).run(getClient());
	return result ? result.refresh_token_version : null;
}

export default createAuthClient<AuthToken, CurrentUser>({
	env: { 
		ACCESS_COOKIE, 
		ACCESS_TOKEN, 
		ACCESS_TOKEN_EXPIRES_IN, 
		REFRESH_COOKIE, 
		REFRESH_TOKEN, 
		REFRESH_TOKEN_EXPIRES_IN 
	},
	findCurrentUser(payload) {
		return findCurrentUser(payload.id).then((user) => user.failed ? null : user.data);
	},
	findRefreshVersion(payload) {
		return findUserRefreshTokenVersion(payload.id);
	},
	getPurePayload(payload) {
		return { id: payload.id };
	},
	isPayload(cookie): cookie is AuthToken {
		return safeParse(AuthTokenSchema, cookie).success;
	},
	routes: {
		signIn: "/auth/sign-in",
		signUp: "/auth/sign-up",
		protected: ["/dashboard"]
	}
});
