// =========================
// src/lib/services/perkuliahan/mk/fetchAllMk.ts
// =========================
// Service to fetch mata kuliah data from the internal proxy route
// Mirrors structure and behavior of fetchAllFak.ts
// =========================
import type { MataKuliahResponse } from "@/lib/services/perkuliahan/mk/type";
import { buildApiUrl } from "@/lib/util/basePathConfigure";

// =========================
// Constants
// =========================
const API_ENDPOINT = buildApiUrl("/api/perkuliahan/mk");

// =========================
// Request Cache for Deduplication
// =========================
// Cache ongoing requests by full URL to avoid duplicate network calls
const requestCache = new Map<string, Promise<MataKuliahResponse>>();

// =========================
// Service Function
// =========================
/**
 * Fetch all mata kuliah from internal route `/api/perkuliahan/mk`.
 * Accepts optional params: page, per_page, q
 * Returns MataKuliahResponse which will be consumed by callers.
 *
 * Implementation notes:
 * - Uses a simple request deduplication cache (Map) so concurrent calls for the same
 *   URL share the same promise.
 * - Cleans the cache entry after 30 seconds to avoid unbounded memory growth.
 */
export const fetchAllMk = async (
  params?: { page?: number; per_page?: number; q?: string }
): Promise<MataKuliahResponse> => {
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
    const requestPromise = (async (): Promise<MataKuliahResponse> => {
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

      return responseData as MataKuliahResponse;
    })();

    requestCache.set(url, requestPromise);

    // 4. Clear cache entry after 30 seconds
    setTimeout(() => requestCache.delete(url), 30 * 1000);

    // 5. Return the result
    return await requestPromise;
  } catch (error) {
    console.error("fetchAllMk error:", error);
    throw error;
  }
};
