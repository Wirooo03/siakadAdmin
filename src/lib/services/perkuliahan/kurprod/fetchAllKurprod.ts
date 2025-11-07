// =========================
// src/lib/services/perkuliahan/kurprod/fetchAllKurprod.ts
// =========================
// Service to fetch kurikulum prodi data from the internal proxy route
// Mirrors structure and behavior of fetchAllThkur.ts
// =========================
import type { KurikulumProdiResponse } from "@/lib/services/perkuliahan/kurprod/type";
import { buildApiUrl } from "@/lib/util/basePathConfigure";

// =========================
// Constants
// =========================
const API_ENDPOINT = buildApiUrl("/api/perkuliahan/kurprod");

// =========================
// Request Cache for Deduplication
// =========================
const requestCache = new Map<string, Promise<KurikulumProdiResponse>>();

// =========================
// Service Function
// =========================
/**
 * Fetch kurikulum prodi from internal route `/api/perkuliahan/kurprod`.
 * Accepts optional params: id_sms, id_kurikulum, page, per_page, q
 * Returns KurikulumProdiResponse which will be consumed by callers.
 */
export const fetchAllKurprod = async (
  params?: { id_sms?: string; id_kurikulum?: string; page?: number; per_page?: number; q?: string }
): Promise<KurikulumProdiResponse> => {
  try {
    // 1. Build URL with query parameters
    let url = API_ENDPOINT;

    if (params) {
      const searchParams = new URLSearchParams();
      if (params.id_sms) searchParams.append("id_sms", String(params.id_sms));
      if (params.id_kurikulum) searchParams.append("id_kurikulum", String(params.id_kurikulum));
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
    const requestPromise = (async (): Promise<KurikulumProdiResponse> => {
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

      return responseData as KurikulumProdiResponse;
    })();

    requestCache.set(url, requestPromise);

    // 4. Clear cache entry after 30 seconds
    setTimeout(() => requestCache.delete(url), 30 * 1000);

    // 5. Return the result
    return await requestPromise;
  } catch (error) {
    console.error("fetchAllKurprod error:", error);
    throw error;
  }
};
