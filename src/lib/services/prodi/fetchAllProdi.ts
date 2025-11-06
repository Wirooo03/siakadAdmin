// =========================
// src/lib/services/prodi/fetchAllProdi.ts
// =========================
// =========================
// Imports
// =========================
import type { ProgramStudiResponse } from "@/lib/services/data-kampus/pendidikan-tinggi/prod/type";
import { buildApiUrl } from "@/lib/util/basePathConfigure";

// =========================
// Constants
// =========================
const API_ENDPOINT = buildApiUrl("/api/prodi");

// =========================
// Request Cache for Deduplication
// =========================
// Cache ongoing requests by full URL to avoid duplicate network calls
const requestCache = new Map<string, Promise<ProgramStudiResponse>>();

// =========================
// Service Function
// =========================
/**
 * Fetch all program studi from internal route `/api/prodi`.
 * Accepts optional params: page, per_page, q
 * Returns ProgramStudiResponse which will be consumed by callers.
 *
 * Implementation notes:
 * - Uses a simple request deduplication cache (Map) so concurrent calls for the same
 *   URL share the same promise.
 * - Cleans the cache entry after 30 seconds to avoid unbounded memory growth.
 */
export const fetchAllProdi = async (
  params?: { page?: number; per_page?: number; q?: string }
): Promise<ProgramStudiResponse> => {
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
    const requestPromise = (async (): Promise<ProgramStudiResponse> => {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        cache: "no-store",
      });

      const responseData = await res.json();

      if (!res.ok) {
        // Keep behavior consistent with previous implementation (throw on non-OK)
        throw new Error(responseData?.message || `HTTP error! status: ${res.status}`);
      }

      return responseData as ProgramStudiResponse;
    })();

    requestCache.set(url, requestPromise);

    // 4. Clear cache entry after 30 seconds
    setTimeout(() => requestCache.delete(url), 30 * 1000);

    // 5. Return the result
    return await requestPromise;
  } catch (error) {
    console.error("fetchAllProdi error:", error);
    throw error;
  }
};
