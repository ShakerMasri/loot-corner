import type { UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";
import { Readable } from "node:stream";
import { requireAdmin } from "~/lib/admin";
import { cloudinary } from "~/lib/cloudinary";

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;

function isAllowedImageType(type: string) {
  return ["image/jpeg", "image/png", "image/webp"].includes(type);
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "Cloudinary upload failed.";
}

function uploadBufferToCloudinary(buffer: Buffer, folder: string) {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          {
            width: 1200,
            height: 1200,
            crop: "limit",
            quality: "auto",
            fetch_format: "auto",
          },
        ],
      },
      (error, result) => {
        if (error) {
          reject(new Error(getErrorMessage(error)));
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary upload failed."));
          return;
        }

        resolve(result);
      },
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}

export async function POST(request: Request) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const formData = await request.formData().catch(() => null);

  if (!formData) {
    return NextResponse.json(
      { message: "Invalid form data." },
      { status: 400 },
    );
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      {
        message: "Invalid input.",
        errors: {
          file: ["Product image file is required."],
        },
      },
      { status: 400 },
    );
  }

  if (!isAllowedImageType(file.type)) {
    return NextResponse.json(
      {
        message: "Invalid input.",
        errors: {
          file: ["Only JPG, PNG, and WEBP images are allowed."],
        },
      },
      { status: 400 },
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      {
        message: "Invalid input.",
        errors: {
          file: ["Image must be 2MB or smaller."],
        },
      },
      { status: 400 },
    );
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const folder =
      process.env.CLOUDINARY_PRODUCT_FOLDER ?? "loot-corner/products";

    const uploadedImage = await uploadBufferToCloudinary(buffer, folder);

    return NextResponse.json({
      message: "Product image uploaded successfully.",
      image: {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
        width: uploadedImage.width,
        height: uploadedImage.height,
        format: uploadedImage.format,
        bytes: uploadedImage.bytes,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to upload product image." },
      { status: 500 },
    );
  }
}
