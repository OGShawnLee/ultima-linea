import type { Client } from "edgedb";
import e, { createClient } from "$lib/edgeql-js";

export default e;

let client: Client;

export function getClient() {
  return client ? client : (client = createClient());
}
