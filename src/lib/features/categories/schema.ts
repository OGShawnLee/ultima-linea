import type { Region } from "@interfaces";
import { type InferOutput, boolean, object, picklist } from "valibot";
import { getKeysOf } from "$lib";

export const RegionEnumeration: Record<Region, string> = {
  INTERNATIONAL: "Internacional",
  NATIONAL: "Nacional",
  STATAL: "Estatal",
  LOCAL: "Local"
}

const RegionSchema = picklist(
  getKeysOf(RegionEnumeration),
  "Región debe ser uno de los valores determinados."
);
const FeaturedSchema = boolean("Destacado debe ser un valor booleano.");

export const CategoriesSchema = object({
  region: RegionSchema,
  featured: FeaturedSchema
});

export type CategoriesData = InferOutput<typeof CategoriesSchema>;
export type RegionData = InferOutput<typeof RegionSchema>;

export function getRegionLabel(region: Region) {
  return RegionEnumeration[region];
}

export function isRegion(region: unknown): region is Region {
  return typeof region === "string" && region.toUpperCase() in RegionEnumeration;
}