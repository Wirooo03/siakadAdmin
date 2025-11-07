// =========================
// src/lib/services/data-kampus/lokasi-kampus/fetchAllLokasiKampus.ts
// =========================
// Service to fetch lokasi kampus data from the internal proxy route
// Mirrors structure and behavior of fetchAllFak.ts (flat array response)
// =========================
import type { LokasiKampusResponse } from "@/lib/services/data-kampus/pendidikan-tinggi/lokasi-kampus/type";
import { buildApiUrl } from "@/lib/util/basePathConfigure";

// =========================
// Constants
// =========================
const API_ENDPOINT = buildApiUrl("/api/data-kampus/lokasi-kampus");

// =========================
// Request Cache for Deduplication
// =========================
// Cache ongoing requests by full URL to avoid duplicate network calls
const requestCache = new Map<string, Promise<LokasiKampusResponse>>();

// =========================
// Service Function
// =========================
/**
 * Fetch all lokasi kampus from internal route `/api/data-kampus/lokasi-kampus`.
 * Returns LokasiKampusResponse which will be consumed by callers.
 *
 * Implementation notes:
 * - Uses a simple request deduplication cache (Map) so concurrent calls for the same
 *   URL share the same promise.
 * - Cleans the cache entry after 30 seconds to avoid unbounded memory growth.
 */
export const fetchAllLokasiKampus = async (): Promise<LokasiKampusResponse> => {
  try {
    const url = API_ENDPOINT;

    // 1. Deduplication: return cached promise if exists
    if (requestCache.has(url)) {
      return await requestCache.get(url)!;
    }

    // 2. Create request promise and store in cache
    const requestPromise = (async (): Promise<LokasiKampusResponse> => {
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

      return responseData as LokasiKampusResponse;
    })();

    requestCache.set(url, requestPromise);

    // 3. Clear cache entry after 30 seconds
    setTimeout(() => requestCache.delete(url), 30 * 1000);

    // 4. Return the result
    return await requestPromise;
  } catch (error) {
    console.error("fetchAllLokasiKampus error:", error);
    throw error;
  }
};
