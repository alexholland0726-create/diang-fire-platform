import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isAdminRequest, unauthorizedJson } from "@/lib/auth";

export const dynamic = "force-dynamic";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxFileSize = 5 * 1024 * 1024;

function getExtension(file: File) {
  const originalExtension = path.extname(file.name).toLowerCase();

  if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(originalExtension)) {
    return originalExtension;
  }

  return file.type === "image/png" ? ".png" : ".jpg";
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorizedJson();
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "请选择要上传的图片" }, { status: 400 });
  }

  if (!allowedTypes.has(file.type)) {
    return NextResponse.json({ error: "只支持 JPG、PNG、WebP 或 GIF 图片" }, { status: 400 });
  }

  if (file.size > maxFileSize) {
    return NextResponse.json({ error: "图片不能超过 5MB" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "products");
  await fs.mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${randomUUID()}${getExtension(file)}`;
  const filepath = path.join(uploadDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filepath, buffer);

  return NextResponse.json({ url: `/uploads/products/${filename}` });
}
