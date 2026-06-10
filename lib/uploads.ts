import path from "node:path";

export const productUploadUrlPrefix = "/uploads/products";

export function getProductUploadDir() {
  return process.env.DIANG_UPLOAD_DIR || path.join(process.cwd(), "public", "uploads", "products");
}

export function getProductUploadPath(filename: string) {
  return path.join(getProductUploadDir(), filename);
}

export function isSafeUploadFilename(filename: string) {
  return /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(filename);
}
