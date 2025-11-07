// Proxy route for Master Unit dropdown
import { NextResponse, type NextRequest } from "next/server";
import type { UnitResponse } from "@/lib/services/master/unit/type";

// Prefer server env SIAKAD_URL, fallback to NEXT_PUBLIC_API_URL
const SIAKAD_URL = process.env.SIAKAD_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";

function buildTargetUrl(request: Request | NextRequest): string {
	const incoming = new URL(request.url);
	const qs = incoming.search || "";

	return `${SIAKAD_URL.replace(/\/$/, "")}/api/v1/program-studi/dropdown/unit${qs}`;
}

async function fetchExternalUnit(url: string): Promise<UnitResponse> {
	const res = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });

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

	return data as UnitResponse;
}

function errorResponse(message: string, status = 500) {
	return NextResponse.json({ error: message }, { status });
}

export async function GET(request: Request | NextRequest) {
	try {
		if (!SIAKAD_URL) return errorResponse("SIAKAD_URL not configured", 500);

		const target = buildTargetUrl(request);
		const data = await fetchExternalUnit(target);

		return NextResponse.json(data);
	} catch (err: any) {
		console.error("/api/master/unit error:", err);
		const status = err?.status || 500;
		const msg = err?.message || String(err);
		return errorResponse(msg, status);
	}
}
