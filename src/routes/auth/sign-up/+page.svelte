<script>
	import { Auth } from '@layout';
	import { SignUpSchema } from '@auth/schema';
	import { AtSign, Lock, Mail, UserCircle } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { Control, Field } from 'formsnap';

	export let data;

	const form = superForm(data.form, {
		validators: valibotClient(SignUpSchema)
	});
	const { form: input, enhance } = form;
</script>

<Auth variant="sign-up" let:Input {enhance}>
	<Field {form} name="name">
		<Input.Group>
			<Control let:attrs>
				<Input.Input
					id={attrs.name}
					label="Nombre"
					icon={UserCircle}
					placeholder="Introduzca su nombre completo"
					bind:value={$input['name']}
				/>
			</Control>
			<Input.Error />
		</Input.Group>
	</Field>
  <Field {form} name="display-name">
    <Input.Group>
      <Control let:attrs>
        <Input.Input
          id={attrs.name}
          label="Usuario"
          icon={AtSign}
          placeholder="Introduzca su nombre de usuario"
          bind:value={$input['display-name']}
        />
      </Control>
      <Input.Error />
    </Input.Group>
  </Field>
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
