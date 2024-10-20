import auth from "@auth";

export function GET(event) {
	auth.deleteAuthCookie(event.cookies);
	return new Response(null, { status: 303, headers: { location: auth.signInRoute } });
}