import type { News } from "@interfaces";
import type { CardCaption, CardImage } from "@picture/schema";

export const MIN_TITLE_LENGTH = 32;
export const MAX_TITLE_LENGTH = 256;
export const MIN_SUMMARY_LENGTH = 64;
export const MAX_SUMMARY_LENGTH = 256;
export const MIN_CONTENT_LENGTH = 512;
export const MAX_CONTENT_LENGTH = 8192;
export const MIN_TEXT_LENGTH = MIN_CONTENT_LENGTH;
export const MAX_TEXT_LENGTH = MAX_CONTENT_LENGTH;

export const CONSTANTS = {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_SUMMARY_LENGTH,
  MAX_SUMMARY_LENGTH,
  MIN_CONTENT_LENGTH,
  MAX_CONTENT_LENGTH,
  MIN_TEXT_LENGTH,
  MAX_TEXT_LENGTH
};

export type CardArticle =
  Pick<News, "id" | "title" | "summary" | "region" | "created_at" | "updated_at">
  & { caption: CardCaption }
  & { image: CardImage };