<script>
	import { Auth } from '@layout';
	import { SignInSchema } from '@schema/user';
	import { Lock, Mail } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { Control, Field } from 'formsnap';

	export let data;

	const form = superForm(data.form, {
		validators: valibotClient(SignInSchema)
	});
	const { form: input, enhance } = form;
</script>

<Auth variant="sign-in" let:Input {enhance}>
	<Field {form} name="email">
		<Input.Group>
			<Control let:attrs>
				<Input.Input
					id={attrs.name}
					label="Correo electrónico"
					icon={Mail}
					type="email"
					placeholder="Introduzca su correo electrónico"
					bind:value={$input['email']}
				/>
			</Control>
			<Input.Error />
		</Input.Group>
	</Field>
	<Field {form} name="password">
		<Input.Group>
			<Control let:attrs>
				<Input.Input
					id={attrs.name}
					label="Contraseña"
					icon={Lock}
					type="password"
					placeholder="Introduzca su contraseña"
					bind:value={$input['password']}
				/>
			</Control>
			<Input.Error />
		</Input.Group>
	</Field>
</Auth>
