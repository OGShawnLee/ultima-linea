import auth from "@auth/server";
import { ConstraintViolationError } from "edgedb";
import { SignUpSchema } from "@auth/schema";
import { createUser } from "@user/server";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters"
import { error, redirect } from "@sveltejs/kit";

export async function load() {
	return {
		form: await superValidate(valibot(SignUpSchema))
	};
}

export const actions = {
	async default(event) {
		const form = await superValidate(event, valibot(SignUpSchema));

		if (form.valid === false) {
			return fail(400, { form });
		}

		const user = await createUser(form.data);

		if (user.failed) {
			if (user.error instanceof ConstraintViolationError) {
				if (user.error.message.includes("display_name")) {
					return setError(form, "display-name", "Ya existe un usuario con este nombre de usuario.");
				}

				if (user.error.message.includes("email")) {
					return setError(form, "email", "Ya existe un usuario con este correo electrónico.");
				}
			} 

			throw error(500, "No ha sido posible crear su cuenta, intente más tarde.");
		}

		throw redirect(303, auth.signInRoute);
	}
};