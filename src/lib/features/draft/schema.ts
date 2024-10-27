import type { Draft } from "@interfaces";
import type { CardCaption, CardImage } from "@picture/schema";
import { type InferOutput, maxLength, minLength, nullish, object, pipe, string, transform, trim } from "valibot";
import { MAX_CONTENT_LENGTH, MAX_SUMMARY_LENGTH, MAX_TEXT_LENGTH, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH } from "@article/schema";
import { f } from "$lib";

export type CardDraft =
  Pick<Draft, "id" | "title" | "summary" | "region" | "can_be_published" | "is_different_from_article" | "is_published" | "updated_at">
  & { caption: Nullish<CardCaption> }
  & { image: Nullish<CardImage> }
  & { article: { id: string } | null };

function reduceSpacing(input: string) {
  return input.replace(/\s+/g, " ");
}

const TitleSchema = pipe(
  string("El título debe ser una cadena de texto."),
  trim(),
  transform(reduceSpacing),
  minLength(MIN_TITLE_LENGTH, f("El título debe tener al menos {0} caracteres.", MIN_TITLE_LENGTH)),
  maxLength(MAX_TITLE_LENGTH, f("El título debe tener como máximo {0} caracteres.", MAX_TITLE_LENGTH))
);
const ContentSchema = pipe(
  string("El contenido debe ser una cadena de texto."),
  trim(),
  transform(reduceSpacing),
  maxLength(MAX_CONTENT_LENGTH, f("El contenido debe tener como máximo {0} caracteres.", MAX_CONTENT_LENGTH))
);
const SummarySchema = pipe(
  string("El resumen debe ser una cadena de texto."),
  trim(),
  transform(reduceSpacing),
  maxLength(MAX_SUMMARY_LENGTH, f("El resumen debe tener como máximo {0} caracteres.", MAX_SUMMARY_LENGTH))
);
const TextSchema = pipe(
  string("El texto debe ser una cadena de texto."),
  trim(),
  transform(reduceSpacing),
  maxLength(MAX_TEXT_LENGTH, f("El texto debe tener como máximo {0} caracteres.", MAX_TEXT_LENGTH))
);

export const DraftSchema = object({
  title: TitleSchema,
  summary: nullish(SummarySchema),
  content: nullish(ContentSchema),
  text: nullish(TextSchema),
});

export type DraftData = InferOutput<typeof DraftSchema>;
