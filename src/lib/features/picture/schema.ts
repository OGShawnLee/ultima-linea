import { type InferOutput, instance, mimeType, maxSize, nullish, object, pipe, string, trim, nullable } from "valibot";
import type { Caption, Image } from "@interfaces";
import { getMinLengthAction, getMaxLengthAction } from "@schema";

export type CardCaption = Pick<Caption, "image_label" | "image_src">;
export type CardImage = Pick<Image, "image_key" | "image_url">;

export const MIN_IMAGE_LABEL_LENGTH = 6;
export const MAX_IMAGE_LABEL_LENGTH = 512;
export const MIN_IMAGE_SRC_LENGTH = 3;
export const MAX_IMAGE_SRC_LENGTH = 64;
export const MIN_IMAGE_URL_LENGTH = 6;
export const MAX_IMAGE_URL_LENGTH = 256;
export const MIN_IMAGE_KEY_LENGTH = MIN_IMAGE_URL_LENGTH;
export const MAX_IMAGE_KEY_LENGTH = MAX_IMAGE_URL_LENGTH;

const ImageFileSchema = pipe(
  instance(File, "La imagen debe ser un archivo."),
  mimeType(
    ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    "La imagen debe ser de tipo JPEG, JPG, PNG o WEBP."
  ),
  maxSize(4 * 1024 * 1024, "La imagen debe pesar como máximo 4MB.")
);
const ImageLabelSchema = pipe(
  string("La descripción de imagen debe ser una cadena de texto."),
  trim(),
  getMinLengthAction(MIN_IMAGE_LABEL_LENGTH, "descripción de imagen"),
  getMaxLengthAction(MAX_IMAGE_LABEL_LENGTH, "descripción de imagen")
);
const ImageSRCSchema = pipe(
  string("Fuente de imagen debe ser una cadena de texto."),
  trim(),
  getMinLengthAction(MIN_IMAGE_SRC_LENGTH, "fuente de imagen"),
  getMaxLengthAction(MAX_IMAGE_SRC_LENGTH, "fuente de imagen")
);
const ImageURLSchema = pipe(
  string("La URL de imagen debe ser una cadena de texto."),
  trim(),
  getMinLengthAction(MIN_IMAGE_URL_LENGTH, "URL de imagen"),
  getMaxLengthAction(MAX_IMAGE_URL_LENGTH, "URL de imagen")
);
const ImageKeySchema = pipe(
  string("La clave de imagen debe ser una cadena de texto."),
  trim(),
  getMinLengthAction(MIN_IMAGE_KEY_LENGTH, "clave de imagen"),
  getMaxLengthAction(MAX_IMAGE_KEY_LENGTH, "clave de imagen")
);

export const PictureSchema = object({
  "image-file": nullable(ImageFileSchema),
  "image-label": ImageLabelSchema,
  "image-src": ImageSRCSchema,
  "image-key": nullish(ImageKeySchema),
  "image-url": nullish(ImageURLSchema)
});

export type PictureData = InferOutput<typeof PictureSchema>;
export type CaptionData = Pick<PictureData, "image-label" | "image-src">;
export type ImageData = StrictObject<Pick<PictureData, "image-key" | "image-url">>;