// Proxy route for kelas kuliah data from external service
import { NextResponse, type NextRequest } from "next/server";
import type { KelasKuliahResponse } from "@/lib/services/perkuliahan/klskul/type";

// External base URL. Prefer server env SIAKAD_URL, fallback to NEXT_PUBLIC_API_URL
const SIAKAD_URL = process.env.SIAKAD_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";

function buildTargetUrl(request: Request | NextRequest): string {
  const incoming = new URL(request.url);
  const qs = incoming.search || ""; // includes leading '?'

  return `${SIAKAD_URL.replace(/\/$/, "")}/api/v1/data-kelas-kuliah${qs}`;
}

async function fetchExternalKelasKuliah(url: string): Promise<KelasKuliahResponse> {
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  // Defensive parse: read text then JSON.parse to give clearer errors on HTML responses
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
  }  return data as KelasKuliahResponse;
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

    const data = await fetchExternalKelasKuliah(target);

    return NextResponse.json(data);
  } catch (err) {
    console.error("/api/perkuliahan/klskul error:", err);
    const error = err as Error & { status?: number };
    const status = error?.status || 500;
    const msg = error?.message || String(err);
    return errorResponse(msg, status);
  }
}
