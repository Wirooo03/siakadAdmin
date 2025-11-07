// =========================
// src/lib/services/data-kampus/perkuliahan/thkur/fetchAllThkur.ts
// =========================
// Service to fetch tahun kurikulum data from the internal proxy route
// Mirrors structure and behavior of fetchAllMhs.ts
// =========================
import type { TahunKurikulumResponse } from "@/lib/services/data-kampus/data-kuliah/thkur/type";
import { buildApiUrl } from "@/lib/util/basePathConfigure";

// =========================
// Constants
// =========================
const API_ENDPOINT = buildApiUrl("/api/data-kampus/data-kuliah/thkur");

// =========================
// Request Cache for Deduplication
// =========================
const requestCache = new Map<string, Promise<TahunKurikulumResponse>>();

// =========================
// Service Function
// =========================
/**
 * Fetch tahun kurikulum from internal route `/api/data-kampus/thkur`.
 * Accepts optional params: page, per_page, q
 * Returns TahunKurikulumResponse which will be consumed by callers.
 */
export const fetchAllThkur = async (
  params?: { page?: number; per_page?: number; q?: string }
): Promise<TahunKurikulumResponse> => {
  try {
    // 1. Build URL with query parameters
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
    const requestPromise = (async (): Promise<TahunKurikulumResponse> => {
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

      return responseData as TahunKurikulumResponse;
    })();

    requestCache.set(url, requestPromise);

    // 4. Clear cache entry after 30 seconds
    setTimeout(() => requestCache.delete(url), 30 * 1000);

    // 5. Return the result
    return await requestPromise;
  } catch (error) {
    console.error("fetchAllThkur error:", error);
    throw error;
  }
};
