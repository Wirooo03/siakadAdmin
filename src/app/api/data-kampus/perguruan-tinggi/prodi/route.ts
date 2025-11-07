// =========================
// src/app/api/prodi/route.ts
// =========================
// =========================
// Imports
// =========================
import { NextResponse, type NextRequest } from "next/server";
import type { ProgramStudiResponse } from "@/lib/services/data-kampus/pendidikan-tinggi/prod/type";

// =========================
// Constants
// =========================
// External SIAKAD base URL. Prefer server env SIAKAD_URL, fallback to NEXT_PUBLIC_API_URL
const SIAKAD_URL = process.env.SIAKAD_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";

// =========================
// Helper functions
// =========================

/**
 * Build external target URL for the SIAKAD program-studi endpoint.
 * It preserves the incoming request's query string.
 */
function buildTargetUrl(request: Request | NextRequest): string {
  const incoming = new URL(request.url);
  const qs = incoming.search || ""; // includes leading '?'

  return `${SIAKAD_URL.replace(/\/$/, "")}/api/v1/program-studi${qs}`;
}

/**
 * Perform fetch to external API and parse JSON. Throws on non-OK responses.
 */
async function fetchExternalProgramStudi(url: string): Promise<ProgramStudiResponse> {
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    // Throw to let caller handle logging/response
    const message = data?.message || `HTTP error! status: ${res.status}`;
    const err: any = new Error(message);
    err.status = res.status;
    err.payload = data;
    throw err;
  }

  return data as ProgramStudiResponse;
}

/**
 * Standardized error response helper for this route
 */
function errorResponse(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

// =========================
// Route handlers
// =========================

/**
 * GET /api/prodi -> proxy to SIAKAD /api/v1/program-studi
 */
export async function GET(request: Request | NextRequest) {
  try {
    if (!SIAKAD_URL) {
      return errorResponse("SIAKAD_URL not configured", 500);
    }

    const target = buildTargetUrl(request);

    const data = await fetchExternalProgramStudi(target);

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("/api/prodi error:", err);
    const status = err?.status || 500;
    const msg = err?.message || String(err);
    return errorResponse(msg, status);
  }
}
