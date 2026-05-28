import { NextResponse } from "next/server";
import { isAdminRequest, unauthorizedJson } from "@/lib/auth";
import { listInquiries } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorizedJson();
  }

  return NextResponse.json({ inquiries: listInquiries() });
}
