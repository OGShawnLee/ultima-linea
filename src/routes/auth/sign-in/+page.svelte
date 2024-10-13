<script>
  import Auth from "$lib/layouts/Auth.svelte";
  import { AtSign, Key } from "lucide-svelte";
</script>

<Auth variant="sign-in" let:Input>
  <Input
    label="Correo electrónico"
    type="email"
    icon={AtSign}
    placeholder="Introduzca su correo electrónico"
  />
  <Input
    label="Contraseña"
    type="password"
    icon={Key}
    placeholder="Introduzca su contraseña"
  />
</Auth>