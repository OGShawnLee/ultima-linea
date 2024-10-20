import { type AuthToken, AuthTokenSchema } from "@auth/schema";
import { type CurrentUser, findCurrentUser } from "@user/server";
import createAuthClient from "$lib/server/mini-auth";
import { ACCESS_TOKEN, AUTH_COOKIE } from "$env/static/private";
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
