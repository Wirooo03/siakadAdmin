// Proxy route for Kelompok Mata Kuliah (kelompok-matkul) reference data
import { NextResponse, type NextRequest } from "next/server";
import type { KelompokMkResponse } from "@/lib/services/data-kampus/data-kuliah/klpkmk/type";

// External base URL. Prefer server env SIAKAD_URL, fallback to NEXT_PUBLIC_API_URL
const SIAKAD_URL = process.env.SIAKAD_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";

function buildTargetUrl(request: Request | NextRequest): string {
	const incoming = new URL(request.url);
	const qs = incoming.search || ""; // includes leading '?'

	return `${SIAKAD_URL.replace(/\/$/, "")}/api/v1/ref/kelompok-matkul${qs}`;
}

async function fetchExternalKlpMk(url: string): Promise<KelompokMkResponse> {
	const res = await fetch(url, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});

	// Defensive parsing: upstream may return HTML (e.g. 404 page) which would
	// cause res.json() to throw 'Unexpected token <'. Read as text and parse.
	const text = await res.text();
	let data: any;
	try {
		data = text ? JSON.parse(text) : {};
	} catch (parseErr) {
		const snippet = text ? text.slice(0, 1000) : "";
		const message = `Upstream returned non-JSON response (first 200 chars): ${snippet.slice(0,200)}`;
		const err: any = new Error(message);
		err.status = res.status;
		err.payload = { raw: snippet };
		throw err;
	}

	if (!res.ok) {
		const message = data?.message || `HTTP error! status: ${res.status}`;
		const err: any = new Error(message);
		err.status = res.status;
		err.payload = data;
		throw err;
	}

	return data as KelompokMkResponse;
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

		const data = await fetchExternalKlpMk(target);

		return NextResponse.json(data);
	} catch (err: any) {
		console.error("/api/data-kampus/data-kuliah/klpkmk error:", err);
		const status = err?.status || 500;
		const msg = err?.message || String(err);
		return errorResponse(msg, status);
	}
}
