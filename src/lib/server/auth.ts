import type { AuthToken } from "@schema/user";
import { type CurrentUser, findCurrentUser } from "@db/user";
import createAuthClient from "./mini-auth";
import { ACCESS_TOKEN, AUTH_COOKIE } from "$env/static/private";
import { AuthTokenSchema } from "@schema/user";
import { safeParse } from "valibot";

export default createAuthClient<AuthToken, CurrentUser>({
	ACCESS_TOKEN,
	AUTH_COOKIE,
	expiresIn: "3d",
	protectedRoutes: ["/dashboard"],
	isValidToken(payload): payload is AuthToken {
		return safeParse(AuthTokenSchema, payload).success;
	},
	findCurrentUser(payload) {
		return findCurrentUser(payload.id).then((user) => user.failed ? null : user.data);
	},
	checkAuthorization(payload, id) {
		return payload.id === id;
	},
	handle: {
		signInRoute: "/auth/sign-in",
		authRoutes: ["/auth/sign-in", "/auth/sign-up"]
	}
});
