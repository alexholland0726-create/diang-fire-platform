import { NextResponse } from "next/server";
import { listCategories } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ categories: listCategories() });
}
