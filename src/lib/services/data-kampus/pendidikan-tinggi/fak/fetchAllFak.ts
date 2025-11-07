// =========================
// src/lib/services/data-kampus/pendidikan-tinggi/fak/fetchAllFak.ts
// =========================
// Service to fetch fakultas data from the internal proxy route
// Mirrors structure and behavior of fetchAllProd.ts
// =========================
import type { FakultasResponse } from "@/lib/services/data-kampus/pendidikan-tinggi/fak/type";
import { buildApiUrl } from "@/lib/util/basePathConfigure";

// =========================
// Constants
// =========================
const API_ENDPOINT = buildApiUrl("/api/data-kampus/perguruan-tinggi/fak");

// =========================
// Request Cache for Deduplication
// =========================
// Cache ongoing requests by full URL to avoid duplicate network calls
const requestCache = new Map<string, Promise<FakultasResponse>>();

// =========================
// Service Function
// =========================
/**
 * Fetch all fakultas from internal route `/api/data-kampus/perguruan-tinggi/fak`.
 * Accepts optional params: page, per_page, q
 * Returns FakultasResponse which will be consumed by callers.
 *
 * Implementation notes:
 * - Uses a simple request deduplication cache (Map) so concurrent calls for the same
 *   URL share the same promise.
 * - Cleans the cache entry after 30 seconds to avoid unbounded memory growth.
 */
export const fetchAllFak = async (
  params?: { page?: number; per_page?: number; q?: string }
): Promise<FakultasResponse> => {
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
    const requestPromise = (async (): Promise<FakultasResponse> => {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        cache: "no-store",
      });

      // Parse response defensively: if server returns HTML (e.g. error page)
      // parsing as JSON will throw 'Unexpected token <'. Read as text then
      // attempt JSON.parse to provide clearer errors.
      const text = await res.text();
      let responseData: unknown;
      try {
        responseData = text ? JSON.parse(text) : {};
      } catch {
        const snippet = text ? text.slice(0, 200) : "";
        throw new Error(`Invalid JSON response from ${url}: ${snippet}`);
      }

      if (!res.ok) {
        // Keep behavior consistent with previous implementation (throw on non-OK)
        throw new Error((responseData as { message?: string })?.message || `HTTP error! status: ${res.status}`);
      }

      return responseData as FakultasResponse;
    })();

    requestCache.set(url, requestPromise);

    // 4. Clear cache entry after 30 seconds
    setTimeout(() => requestCache.delete(url), 30 * 1000);

    // 5. Return the result
    return await requestPromise;
  } catch (error) {
    console.error("fetchAllFak error:", error);
    throw error;
  }
};
