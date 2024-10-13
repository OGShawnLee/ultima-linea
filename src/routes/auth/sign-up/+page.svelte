<script>
	import { Input } from '$lib/components';
	import Auth from '$lib/layouts/Auth.svelte';
  import { AtSign, Lock, Mail, UserCircle } from "lucide-svelte";
</script>

<Auth variant="sign-up">
  <Input label="Nombre" icon={UserCircle} placeholder="Introduzca su nombre completo" />
  <Input label="Usuario" icon={AtSign} placeholder="Introduzca su nombre de usuario" />
  <Input label="Correo electrónico" icon={Mail} type="email" placeholder="Introduzca su correo electrónico" />
  <Input label="Contraseña" icon={Lock} type="password" placeholder="Introduzca su contraseña" />
</Auth>