import auth from "@auth/server";

export function GET(event) {
	auth.signOut(event.cookies);
	return new Response(null, { status: 303, headers: { location: auth.signInRoute } });
}