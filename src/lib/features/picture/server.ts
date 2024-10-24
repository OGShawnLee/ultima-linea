import type { CardImage, CaptionData, ImageData } from "@picture/schema";
import e, { getClient } from "@db";
import { useAwait } from "$lib";

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

export function findOrphanImages() {
  return useAwait<CardImage[]>(() => 
    e.select(e.Image, (image) => ({
      image_url: true,
      image_key: true,
      filter: e.op(
        "not",
        e.op("exists", e.select(e.Record, (record) => ({
          filter: e.op(record.image, "=", image)
        })))
      )
    })).run(getClient())
  );
}