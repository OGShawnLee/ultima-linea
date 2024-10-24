import { sendAPIData } from '$lib/api';
import { findOrphanImages } from '@picture/server';
import { uploadthing } from "@server/uploadthing";

export async function DELETE(event) {
  if (event.isSubRequest) {
    const images = await findOrphanImages();
    
    if (images.failed) {
      return new Response(null, { status: 500 });
    }

    const keys = images.data.map((image) => image.image_key);
    const deletion = await uploadthing.deleteFiles(keys);

    if (deletion.success) {
      return sendAPIData(images.data);
    }

    return new Response(null, { status: 500 });
  }

  return new Response(null, { status: 400 });
}