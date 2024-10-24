import type { CardImage } from "@picture/schema";
import { parse, stringify } from "devalue";
import { useAwait } from "$lib";
import { text } from "@sveltejs/kit";

interface Endpoints {
  "/api/picture/orphan": {
    parameters: null,
    data: CardImage[];
  }
};

export function useAPI<Endpoint extends keyof Endpoints>(
  endpoint: Endpoint,
  parameters: Endpoints[Endpoint]["parameters"],
  fetch: typeof globalThis.fetch
) {
  switch (endpoint) {
    case "/api/picture/orphan":
      return useAwait(async () => {
        const images = await fetch("/api/picture/orphan", {
          method: "DELETE"
        });
        const text = await images.text();
        return parse(text) as Endpoints["/api/picture/orphan"]["data"];
      })
    default:
      throw new Error("Invalid Endpoint: " + endpoint);
  }
}

export function sendAPIData<Endpoint extends keyof Endpoints>(
  data: Endpoints[Endpoint]["data"]
) {
  return text(stringify(data), { status: 200 });
}