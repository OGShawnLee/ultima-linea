import type { Result } from "$lib";
import type { Cookies, Handle } from "@sveltejs/kit";
import JWT from "jsonwebtoken";
import BCrypt from "bcrypt";
import { redirect } from "@sveltejs/kit";
import { isNullish, useAwait, useCatch } from "$lib";

type Errors = "NOT-SIGNED" | "INVALID";

interface Configuration<Payload extends object, User extends object> {
	ACCESS_TOKEN: string;
	AUTH_COOKIE: string;
	expiresIn: string;
	isValidToken(cookie: unknown): cookie is Payload;
	protectedRoutes: string[];
	findCurrentUser(payload: Payload): Promise<User | null>;
	checkAuthorization(payload: Payload, id: string): boolean;
	handle: {
		authRoutes: string[];
		signInRoute: string;
	};
}

interface AuthClient<Payload extends object, User extends object> {
	createAuthToken(payload: Payload): string;
	deleteAuthCookie(cookies: Cookies): void;
	getAuthToken(cookies: Cookies): Payload;
	findAuthToken(cookies: Cookies): Result<Payload, Errors>;
	findCurrentUser(cookie: Cookies): Promise<Result<User | null, string>>;
	getcurrentUser(cookies: Cookies): Promise<User>;
	setAuthCookie(cookies: Cookies, payload: Payload): Payload;
	handle: Handle;
	signInRoute: string;
	can(cookies: Cookies, id: string): Promise<boolean>;
	bcrypt: {
		hash(password: string): Promise<string>;
		compare(password: string, hash: string): Promise<boolean>;
	};
}

function createAuthClient<Payload extends object, User extends object>({
	ACCESS_TOKEN,
	AUTH_COOKIE,
	expiresIn,
	isValidToken,
	protectedRoutes,
	findCurrentUser,
	checkAuthorization,
	handle: { signInRoute, authRoutes }
}: Configuration<Payload, User>): AuthClient<Payload, User> {
	function createAuthToken(payload: Payload): string {
		return JWT.sign(payload, ACCESS_TOKEN, { expiresIn });
	}

	function deleteAuthCookie(cookies: Cookies): void {
		cookies.set(AUTH_COOKIE, "", {
			expires: new Date(Date.now() - 3600),
			httpOnly: true,
			path: "/"
		});
	}

	function findAuthToken(cookies: Cookies): Result<Payload, Errors> {
		return useCatch<Payload, Errors>(() => {
			const token = cookies.get(AUTH_COOKIE);
			if (token === undefined || token.trim() === "") throw "NOT-SIGNED";

			const payload = JWT.verify(token, ACCESS_TOKEN);
			if (isValidToken(payload)) return payload;

			throw "INVALID";
		});
	}

	function setAuthCookie(cookies: Cookies, payload: Payload): Payload {
		const token = createAuthToken(payload);
		cookies.set(AUTH_COOKIE, token, { httpOnly: true, path: "/" });
		return payload;
	}

	function isInProtectedRoute(route: string): boolean {
		return protectedRoutes.some((protectedRoute) => route.startsWith(protectedRoute));
	}

	const handle: Handle = ({ event, resolve }) => {
		const token = findAuthToken(event.cookies);
		const route = event.route.id;

		if (token.failed) {
			deleteAuthCookie(event.cookies);
			// @ts-ignore
			event.locals.auth = null;

			if (token.error === "NOT-SIGNED") {
				if (route && isInProtectedRoute(route)) {
					throw redirect(303, signInRoute);
				}

				return resolve(event);
			}

			throw redirect(303, signInRoute);
		} else {
			// @ts-ignore
			event.locals.auth = token.data;

			if (route && authRoutes.includes(route)) {
				throw redirect(303, "/");
			}

			return resolve(event);
		}
	};

	function findCurrentUserFromCookies(cookies: Cookies) {
		return useAwait<User | null, string>(async () => {
			const token = findAuthToken(cookies);
			if (token.failed) throw token.error;
			const result = await useAwait(() => findCurrentUser(token.data));
			if (result.failed) throw "FAILED";
			if (isNullish(result.data)) deleteAuthCookie(cookies);
			return result.data;
		});
	}

	async function getCurrentFromCookies(cookies: Cookies) {
		const user = await findCurrentUserFromCookies(cookies);
		if (user.failed || isNullish(user.data)) throw redirect(303, signInRoute);
		return user.data;
	}

	async function checkAuthorizationFromCookies(cookies: Cookies, id: string) {
		const res = await useAwait<boolean, string>(async () => {
			const token = findAuthToken(cookies);
			if (token.failed) throw token.error;
			return checkAuthorization(token.data, id);
		});

		return res.failed ? false : res.data;
	}

	return {
		createAuthToken,
		deleteAuthCookie,
		findAuthToken,
		handle,
		setAuthCookie,
		signInRoute,
		getcurrentUser: getCurrentFromCookies,
		findCurrentUser: findCurrentUserFromCookies,
		getAuthToken(cookies) {
			const token = findAuthToken(cookies);
			if (token.failed) throw redirect(303, signInRoute);
			return token.data;
		},
		can: checkAuthorizationFromCookies,
		bcrypt: {
			async hash(password: string) {
				return BCrypt.hash(password, 10);
			},
			async compare(password: string, hash: string) {
				return BCrypt.compare(password, hash);
			}
		}
	};
}

export default createAuthClient;