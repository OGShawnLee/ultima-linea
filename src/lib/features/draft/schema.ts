import * as v from "valibot";
import { MAX_CONTENT_LENGTH, MAX_SUMMARY_LENGTH, MAX_TEXT_LENGTH, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH } from "@article/schema";
import { f } from "$lib";

function reduceSpacing(input: string) {
  return input.replace(/\s+/g, " ");
}

const TitleSchema = v.pipe(
  v.string("El título debe ser una cadena de texto."),
  v.trim(),
  v.transform(reduceSpacing),
  v.minLength(MIN_TITLE_LENGTH, f("El título debe tener al menos {0} caracteres.", MIN_TITLE_LENGTH)),
  v.maxLength(MAX_TITLE_LENGTH, f("El título debe tener como máximo {0} caracteres.", MAX_TITLE_LENGTH))
);
const ContentSchema = v.pipe(
  v.string("El contenido debe ser una cadena de texto."),
  v.trim(),
  v.transform(reduceSpacing),
  v.maxLength(MAX_CONTENT_LENGTH, f("El contenido debe tener como máximo {0} caracteres.", MAX_CONTENT_LENGTH))
);
const SummarySchema = v.pipe(
  v.string("El resumen debe ser una cadena de texto."),
  v.trim(),
  v.transform(reduceSpacing),
  v.maxLength(MAX_SUMMARY_LENGTH, f("El resumen debe tener como máximo {0} caracteres.", MAX_SUMMARY_LENGTH))
);
const TextSchema = v.pipe(
  v.string("El texto debe ser una cadena de texto."),
  v.trim(),
  v.transform(reduceSpacing),
  v.maxLength(MAX_TEXT_LENGTH, f("El texto debe tener como máximo {0} caracteres.", MAX_TEXT_LENGTH))
);

export const DraftSchema = v.object({
  title: TitleSchema,
  summary: v.nullish(SummarySchema),
  content: v.nullish(ContentSchema),
  text: v.nullish(TextSchema),
});

export type DraftData = v.InferOutput<typeof DraftSchema>;
