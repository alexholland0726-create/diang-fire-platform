import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { Locale } from "@/lib/site";

const cookieName = "diang_admin_session";
const maxAgeSeconds = 60 * 60 * 8;
const secureCookie = process.env.ADMIN_COOKIE_SECURE === "true";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "diang-dev-session-secret";
}

function sign(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

function parseCookieHeader(header: string | null) {
  const cookiesMap = new Map<string, string>();

  for (const part of (header || "").split(";")) {
    const [key, ...valueParts] = part.trim().split("=");
    if (key) {
      cookiesMap.set(key, decodeURIComponent(valueParts.join("=")));
    }
  }

  return cookiesMap;
}

export function validateAdminCredentials(username: string, password: string) {
  const expectedUsername = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "";

  return username === expectedUsername && Boolean(expectedPassword) && password === expectedPassword;
}

export function createAdminSession(username: string) {
  const expiresAt = Date.now() + maxAgeSeconds * 1000;
  const payload = `${username}.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(token?: string) {
  if (!token) {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const [username, expiresAt, signature] = parts;
  const payload = `${username}.${expiresAt}`;
  const expectedSignature = sign(payload);

  if (
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    return false;
  }

  return Number(expiresAt) > Date.now();
}

export function requireAdminPage(locale: Locale) {
  const token = cookies().get(cookieName)?.value;

  if (!verifyAdminSession(token)) {
    redirect(`/${locale}/admin/login`);
  }
}

export function isAdminRequest(request: Request) {
  const token = parseCookieHeader(request.headers.get("cookie")).get(cookieName);
  return verifyAdminSession(token);
}

export function unauthorizedJson() {
  return NextResponse.json({ error: "请先登录后台" }, { status: 401 });
}

export function setAdminCookie(response: NextResponse, token: string) {
  response.cookies.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie,
    maxAge: maxAgeSeconds,
    path: "/"
  });
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set(cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie,
    maxAge: 0,
    path: "/"
  });
}
