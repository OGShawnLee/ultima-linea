import { maxLength, minLength } from "valibot";
import { f } from "$lib";

export function getMinLengthAction(minlength: number, name: string) {
  return minLength<string, number, string>(minlength, f("La {0} debe tener al menos {1} caracteres.", name, minlength))
}

export function getMaxLengthAction(maxlength: number, name: string) {
  return maxLength<string, number, string>(maxlength, f("La {0} debe tener como máximo {1} caracteres.", name, maxlength))
}

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}