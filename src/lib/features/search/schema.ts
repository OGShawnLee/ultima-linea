import type { Region } from "@interfaces";
import { type InferOutput, minLength, nullable, object, picklist, pipe, string, trim } from "valibot";
import { getKeysOf } from "$lib";

export const SearchRegionEnumeration: Record<Region | "ALL", string> = {
  ALL: "Cualquiera",
  INTERNATIONAL: "Internacional",
  NATIONAL: "Nacional",
  STATAL: "Estatal",
  LOCAL: "Local"
}

const SearchRegionSchema = picklist(
  getKeysOf(SearchRegionEnumeration),
  "Región debe ser uno de los valores determinados."
);

const TermSchema = pipe(
  string("Termino debe ser una cadena de texto."),
  trim(),
  minLength(3, "Termino debe tener al menos 3 caracteres."),
);

export const SearchSchema = object({
  region: nullable(SearchRegionSchema, "ALL"),
  term: nullable(TermSchema),
});

export type SearchData = InferOutput<typeof SearchSchema>;