// Proxy route for ruangan data from external SIAKAD service
import { NextResponse, type NextRequest } from "next/server";
import type { RuanganResponse } from "@/lib/services/data-kampus/pendidikan-tinggi/ruangan/type";

// External SIAKAD base URL. Prefer server env SIAKAD_URL, fallback to NEXT_PUBLIC_API_URL
const SIAKAD_URL = process.env.SIAKAD_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";

function buildTargetUrl(request: Request | NextRequest): string {
  const incoming = new URL(request.url);
  const qs = incoming.search || ""; // includes leading '?'

  return `${SIAKAD_URL.replace(/\/$/, "")}/api/v1/ref/ruang-kuliah${qs}`;
}

async function fetchExternalRuangan(url: string): Promise<RuanganResponse> {
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  // Defensive parsing: upstream may return an HTML error page (starts with '<')
  // which would cause res.json() to throw 'Unexpected token <'. Read as text
  // first and try JSON.parse so we can provide a clearer error payload.
  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    const snippet = text ? text.slice(0, 1000) : "";
    const message = `Upstream returned non-JSON response (first 200 chars): ${snippet.slice(0,200)}`;
    const err = new Error(message) as Error & { status?: number; payload?: unknown };
    err.status = res.status;
    err.payload = { raw: snippet };
    throw err;
  }

  if (!res.ok) {
    const message = (data as { message?: string })?.message || `HTTP error! status: ${res.status}`;
    const err = new Error(message) as Error & { status?: number; payload?: unknown };
    err.status = res.status;
    err.payload = data;
    throw err;
  }

  return data as RuanganResponse;
}

function errorResponse(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: Request | NextRequest) {
  try {
    if (!SIAKAD_URL) {
      return errorResponse("SIAKAD_URL not configured", 500);
    }

    const target = buildTargetUrl(request);

    const data = await fetchExternalRuangan(target);

    return NextResponse.json(data);
  } catch (err) {
    console.error("/api/data-kampus/ruangan error:", err);
    const error = err as Error & { status?: number };
    const status = error?.status || 500;
    const msg = error?.message || String(err);
    return errorResponse(msg, status);
  }
}
