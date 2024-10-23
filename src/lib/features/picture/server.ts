import type { CaptionData, ImageData } from "@picture/schema";
import e from "@db";

export function buildCreateImageQuery(data: ImageData) {
  return e.insert(e.Image, {
    image_key: data["image-key"],
    image_url: data["image-url"]
  });
}

export function buildCreateCaptionQuery(data: CaptionData) {
  return e.insert(e.Caption, {
    image_label: data["image-label"],
    image_src: data["image-src"]
  });
}