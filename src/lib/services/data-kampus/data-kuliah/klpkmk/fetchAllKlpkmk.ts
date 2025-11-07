// =========================
// src/lib/services/data-kampus/data-kuliah/klpkmk/fetchAllKlpkmk.ts
// =========================
// Service to fetch kelompok mata kuliah list via internal proxy route
// Mirrors pattern used by fetchAllThajar / fetchAllJenismk
// =========================
import type { KelompokMkResponse } from "@/lib/services/data-kampus/data-kuliah/klpkmk/type";
import { buildApiUrl } from "@/lib/util/basePathConfigure";

// =========================
// Constants
// =========================
const API_ENDPOINT = buildApiUrl("/api/data-kampus/data-kuliah/klpkmk");

// =========================
// Request Cache for Deduplication
// =========================
const requestCache = new Map<string, Promise<KelompokMkResponse>>();

// =========================
// Service Function
// =========================
/**
 * Fetch kelompok mata kuliah from internal route `/api/data-kampus/data-kuliah/klpkmk`.
 * Accepts optional params (kept for future use): page, per_page, q
 * Returns KelompokMkResponse which will be consumed by callers.
 */
export const fetchAllKlpkmk = async (
  params?: { page?: number; per_page?: number; q?: string }
): Promise<KelompokMkResponse> => {
  try {
    // 1. Build URL with query parameters (kept for compatibility)
    let url = API_ENDPOINT;

    if (params) {
      const searchParams = new URLSearchParams();
      if (params.page !== undefined) searchParams.append("page", String(params.page));
      if (params.per_page !== undefined) searchParams.append("per_page", String(params.per_page));
      if (params.q) searchParams.append("q", params.q);

      const qs = searchParams.toString();
      if (qs) url += `?${qs}`;
    }

    // 2. Deduplication: return cached promise if exists
    if (requestCache.has(url)) {
      return await requestCache.get(url)!;
    }

    // 3. Create request promise and store in cache
    const requestPromise = (async (): Promise<KelompokMkResponse> => {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        cache: "no-store",
      });

      // Defensive parse: read text then JSON.parse to give clearer errors on HTML responses
      const text = await res.text();
      let responseData: any;
      try {
        responseData = text ? JSON.parse(text) : {};
      } catch (err) {
        const snippet = text ? text.slice(0, 200) : "";
        throw new Error(`Invalid JSON response from ${url}: ${snippet}`);
      }

      if (!res.ok) {
        throw new Error(responseData?.message || `HTTP error! status: ${res.status}`);
      }

      return responseData as KelompokMkResponse;
    })();

    requestCache.set(url, requestPromise);

    // 4. Clear cache entry after 30 seconds
    setTimeout(() => requestCache.delete(url), 30 * 1000);

    // 5. Return the result
    return await requestPromise;
  } catch (error) {
    console.error("fetchAllKlpkmk error:", error);
    throw error;
  }
};

export default fetchAllKlpkmk;
