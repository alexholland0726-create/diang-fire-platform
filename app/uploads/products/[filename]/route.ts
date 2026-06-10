import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getProductUploadPath, isSafeUploadFilename } from "@/lib/uploads";

export const dynamic = "force-dynamic";

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp"
};

export async function GET(_request: Request, { params }: { params: { filename: string } }) {
  const filename = params.filename;

  if (!isSafeUploadFilename(filename)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const extension = path.extname(filename).toLowerCase();
  const contentType = contentTypes[extension];

  if (!contentType) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const file = await fs.readFile(getProductUploadPath(filename));
    return new NextResponse(file, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType
      }
    });
  } catch (error) {
    const code = error instanceof Error && "code" in error ? error.code : undefined;

    if (code === "ENOENT") {
      return new NextResponse("Not found", { status: 404 });
    }

    return new NextResponse("Unable to read upload", { status: 500 });
  }
}
