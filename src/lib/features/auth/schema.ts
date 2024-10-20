import * as v from "valibot";

const NameSchema = v.pipe(
  v.string("Nombre debe ser una cadena de texto."),
  v.trim(),
  v.minLength(8, "Nombre debe tener al menos 8 caracteres."),
  v.maxLength(64, "Nombre debe tener como máximo 64 caracteres.")
);
const DisplayNameSchema = v.pipe(
  v.string("Usuario debe ser una cadena de texto."),
  v.trim(),
  v.minLength(4, "Usuario debe tener al menos 3 caracteres."),
  v.maxLength(16, "Usuario debe tener como máximo 16 caracteres.")
);
const EmailSchema = v.pipe(
  v.string("Email debe ser una cadena de texto."),
  v.trim(),
  v.maxLength(64, "Email debe tener como máximo 64 caracteres."),
  v.email("Email debe ser un correo electrónico válido.")
);
const PasswordSchema = v.pipe(
  v.string("Contraseña debe ser una cadena de texto."),
  v.trim(),
  v.minLength(8, "Contraseña debe tener al menos 8 caracteres."),
  v.maxLength(64, "Contraseña debe tener como máximo 64 caracteres.")
);

export const AuthTokenSchema = v.object({
  id: v.pipe(v.string(), v.uuid())
}); 
export const SignInSchema = v.object({
  email: EmailSchema,
  password: PasswordSchema
});
export const SignUpSchema = v.object({
  name: NameSchema,
  "display-name": DisplayNameSchema,
  email: EmailSchema,
  password: PasswordSchema
});

export type AuthToken = v.InferOutput<typeof AuthTokenSchema>;
export type SignInData = v.InferOutput<typeof SignInSchema>;
export type SignUpData = v.InferOutput<typeof SignUpSchema>;