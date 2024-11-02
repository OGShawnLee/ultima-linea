import type { Result } from "$lib";
import type { Cookies, Handle } from "@sveltejs/kit";
import JWT from "jsonwebtoken";
import BCrypt from "bcrypt";
import { error, redirect } from "@sveltejs/kit";
import { isNullish, useAwait, useCatch } from "$lib";
import { number, object, safeParse, string } from "valibot";

interface Payload {
  id: string;
}

interface RefreshState extends Payload {
  refresh_token_version: number;
}

const RefreshStateSchema = object({
  id: string(),
  refresh_token_version: number()
});

type PayloadResult<T> = { data: null; state: "ANON" } | { data: T, state: "FRESH" | "STALE" };

interface Configuration<P extends Payload, U extends object> {
  env: {
    ACCESS_TOKEN: string;
    ACCESS_TOKEN_EXPIRES_IN: string;
    ACCESS_COOKIE: string;
    REFRESH_TOKEN: string;
    REFRESH_TOKEN_EXPIRES_IN: string;
    REFRESH_COOKIE: string;
  }
  routes: {
    signIn: string;
    signUp: string;
    protected: string[];
  },
  findCurrentUser(payload: P): Promise<U | null>;
  findRefreshVersion(payload: P): Promise<number | null>;
  getPurePayload(payload: P): P;
  isPayload(cookie: unknown): cookie is P;
}

function isEmpty(value: string) {
  return value.trim().length === 0;
}

function isRefreshToken(cookie: unknown): cookie is RefreshState {
  return safeParse(RefreshStateSchema, cookie).success;
}

interface AuthClient<P extends Payload, U extends object> {
  bcrypt: {
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
  },
  findAuth(cookies: Cookies): Promise<P | null>;
  findCurrentUser(cookies: Cookies): Promise<Result<U | null>>;
  getAuth(cookies: Cookies): Promise<P>;
  handle: Handle;
  signIn(cookies: Cookies, payload: P, version: number): void;
  signInRoute: string;
  signOut(cookies: Cookies): void;
}

function createAuthClient<P extends Payload, U extends object>({
  env: { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES_IN, ACCESS_COOKIE, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRES_IN, REFRESH_COOKIE },
  findCurrentUser,
  findRefreshVersion,
  getPurePayload,
  isPayload,
  routes: { signIn: signInRoute, signUp: signUpRoute, protected: protectedRoutes }
}: Configuration<P, U>): AuthClient<P, U> {

  function createAccessCookie(payload: P) {
    return JWT.sign(payload, ACCESS_TOKEN, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  }

  function createRefreshCookie(payload: RefreshState) {
    return JWT.sign(payload, REFRESH_TOKEN, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
  }

  function setAccessCookie(cookies: Cookies, payload: P) {
    const token = createAccessCookie(payload);
    cookies.set(ACCESS_COOKIE, token, {
      httpOnly: true,
      secure: true,
      path: "/"
    });
  }

  function setRefreshCookie(cookies: Cookies, payload: RefreshState) {
    const token = createRefreshCookie(payload);
    cookies.set(REFRESH_COOKIE, token, {
      httpOnly: true,
      secure: true,
      path: "/"
    });
  }

  function deleteAuthCookies(cookies: Cookies) {
    cookies.set(ACCESS_COOKIE, "", {
      expires: new Date(Date.now() - 3600),
      httpOnly: true,
      path: "/",
    });
    cookies.set(REFRESH_COOKIE, "", {
      expires: new Date(Date.now() - 3600),
      httpOnly: true,
      path: "/",
    });
  }

  function findPayload(cookies: Cookies): PayloadResult<P> {
    const token = cookies.get(ACCESS_COOKIE);
    if (isNullish(token) || isEmpty(token)) return { data: null, state: "ANON" };
    
    const verified = useCatch(() => JWT.verify(token, ACCESS_TOKEN));
    
    if (verified.failed) {
      if (verified.error instanceof JWT.TokenExpiredError) {
        const decoded = JWT.decode(token);
        if (isPayload(decoded)) return { data: decoded, state: "STALE" };
      }

      deleteAuthCookies(cookies);
      return { data: null, state: "ANON" };
    }
    
    if (isPayload(verified.data)) return { data: verified.data, state: "FRESH" };
    
    deleteAuthCookies(cookies);
    return { data: null, state: "ANON" };
  }

  function findRefresh(cookies: Cookies): number | null {
    const token = cookies.get(REFRESH_COOKIE);

    if (isNullish(token) || isEmpty(token)) return null;

    const verified = useCatch(() => JWT.verify(token, REFRESH_TOKEN));

    if (verified.failed) {
      deleteAuthCookies(cookies);
      return null;
    }

    if (isRefreshToken(verified.data)) {
      return verified.data.refresh_token_version;
    }

    deleteAuthCookies(cookies);
    return null;
  }

  async function findAuth(cookies: Cookies) {
    const payload = findPayload(cookies);

    if (payload.state === "ANON") {
      return null;
    }

    if (payload.state === "FRESH") {
      return payload.data;
    }

    const version = findRefresh(cookies);

    if (isNullish(version)) {
      deleteAuthCookies(cookies);
      throw sendToSignIn();
    }

    const dbVersion = await useAwait(() => findRefreshVersion(payload.data));
    if (dbVersion.failed) {
      throw error(500, "Ha ocurrido un error no esperado, intente más tarde.");
    }

    if (dbVersion.data !== version) {
      deleteAuthCookies(cookies);
      throw sendToSignIn();
    }

    setAccessCookie(cookies, getPurePayload(payload.data));
    return payload.data;
  }

  async function getAuth(cookies: Cookies) {
    const payload = await findAuth(cookies);
    
    if (payload) return payload;

    throw sendToSignIn(); 
  }

  function sendToSignIn() {
    return redirect(303, signInRoute);
  }

  const handle: Handle = async ({ event, resolve }) => {
    const auth = await findAuth(event.cookies);
    const route = event.route.id;

    if (isNullish(auth)) {
      if (route && protectedRoutes.includes(route)) {
        throw sendToSignIn();
      }
    }

    if (auth && route === signInRoute || route === signUpRoute) {
      throw redirect(303, "/");
    }

    return resolve(event);
  }

  return {
    bcrypt: {
      async hash(password: string) {
        return BCrypt.hash(password, 10);
      },
      async compare(password: string, hash: string) {
        return BCrypt.compare(password, hash);
      }
    },
    findAuth,
    findCurrentUser(cookies) {
      return useAwait(async () => {
        const auth = await findAuth(cookies);
        if (auth) return findCurrentUser(auth);
        return null;
      });
    },
    getAuth,
    handle,
    signIn(cookies, payload) {
      setAccessCookie(cookies, payload);
      setRefreshCookie(cookies, { id: payload.id, refresh_token_version: 0 });
    },
    signInRoute,
    signOut: (cookies) => deleteAuthCookies(cookies),
  }
}

export default createAuthClient;