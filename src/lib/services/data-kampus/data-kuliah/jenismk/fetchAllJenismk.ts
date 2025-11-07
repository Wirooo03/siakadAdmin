// =========================
// src/lib/services/data-kampus/data-kuliah/jenismk/fetchAllJenismk.ts
// =========================
// Service to fetch jenis mata kuliah list via internal proxy route
// Mirrors pattern used by fetchAllThajar / fetchAllThkur
// =========================
import type { JenisMkResponse } from "@/lib/services/data-kampus/data-kuliah/jenismk/type";
import { buildApiUrl } from "@/lib/util/basePathConfigure";

// =========================
// Constants
// =========================
const API_ENDPOINT = buildApiUrl("/api/data-kampus/data-kuliah/jenismk");

// =========================
// Request Cache for Deduplication
// =========================
const requestCache = new Map<string, Promise<JenisMkResponse>>();

// =========================
// Service Function
// =========================
/**
 * Fetch jenis mata kuliah from internal route `/api/data-kampus/data-kuliah/jenismk`.
 * Accepts optional params (kept for future use): page, per_page, q
 * Returns JenisMkResponse which will be consumed by callers.
 */
export const fetchAllJenismk = async (
  params?: { page?: number; per_page?: number; q?: string }
): Promise<JenisMkResponse> => {
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
    const requestPromise = (async (): Promise<JenisMkResponse> => {
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

      return responseData as JenisMkResponse;
    })();

    requestCache.set(url, requestPromise);

    // 4. Clear cache entry after 30 seconds
    setTimeout(() => requestCache.delete(url), 30 * 1000);

    // 5. Return the result
    return await requestPromise;
  } catch (error) {
    console.error("fetchAllJenismk error:", error);
    throw error;
  }
};

export default fetchAllJenismk;
