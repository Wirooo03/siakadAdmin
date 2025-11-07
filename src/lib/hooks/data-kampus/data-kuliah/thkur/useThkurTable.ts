// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllThkur } from "@/lib/services/data-kampus/data-kuliah/thkur/fetchAllThkur";
import type { TahunKurikulumResponse } from "@/lib/services/data-kampus/data-kuliah/thkur/type";

// =========================
// Query Keys
// =========================
export const thkurKeys = {
  all: ["tahun-kurikulum"] as const,
  lists: () => [...thkurKeys.all, "list"] as const,
  list: (params: string) => [...thkurKeys.lists(), { params }] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch tahun kurikulum (paginated) via internal route `/api/data-kampus/thkur`.
 * Returns the full TahunKurikulumResponse so the consumer can read `.data` and `.pagination`.
 */
export const useGetAllThkur = (
  params?: { page?: number; per_page?: number; q?: string },
  options?: Omit<UseQueryOptions<TahunKurikulumResponse, Error>, "queryKey" | "queryFn">
) => {
  const queryKey = params ? [...thkurKeys.lists(), params] as const : thkurKeys.lists();

  return useQuery<TahunKurikulumResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetchAllThkur(params);
      // fetchAllThkur will throw on non-ok responses, so just return the response
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Backwards-compatible alias used across the app
 */
export const useThkurTable = (params?: { page?: number; per_page?: number; q?: string }) =>
  useGetAllThkur(params);

export default useThkurTable;
