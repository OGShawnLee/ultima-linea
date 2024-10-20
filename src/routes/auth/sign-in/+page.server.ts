import auth from "@auth/server";
import { SignInSchema } from "@auth/schema";
import { findUserByEmail, hasPasswordMatch } from "@user/server";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters"
import { redirect } from "@sveltejs/kit";

export async function load() {
  return {
    form: await superValidate(valibot(SignInSchema))
  }
}

export const actions = {
  async default(event) {
    const form = await superValidate(event, valibot(SignInSchema));

    if (form.valid === false) {
      return fail(400, form);
    }

    const user = await findUserByEmail(form.data.email);
  
    if (user.failed) {
      return fail(500, form);
    }
    
    if (user.data) {
      const match = await hasPasswordMatch(form.data.password, user.data.encrypted_password);

      if (match) {
        auth.setAuthCookie(event.cookies, { id: user.data.id });
        throw redirect(303, "/");
      }

      return setError(form, "password", "La contraseña no coincide.");
    }

    return setError(form, "email", "No existe un usuario con el email proveido.");
  }
}