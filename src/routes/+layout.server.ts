import auth from "@auth";

export async function load(event) {
	const currentUser = await auth.findCurrentUser(event.cookies);
	return { currentUser: currentUser.failed ? null : currentUser.data };
}