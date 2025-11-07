// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllThajar } from "@/lib/services/data-kampus/data-kuliah/thajar/fetchAllThajar";
import type { TahunAjarResponse } from "@/lib/services/data-kampus/data-kuliah/thajar/type";

// =========================
// Query Keys
// =========================
export const thajarKeys = {
  all: ["tahun-ajaran"] as const,
  lists: () => [...thajarKeys.all, "list"] as const,
  list: (params: string) => [...thajarKeys.lists(), { params }] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch tahun ajaran (paginated) via internal route `/api/data-kampus/thajar`.
 * Returns the full TahunAjarResponse so the consumer can read `.data` and `.meta`.
 */
export const useGetAllThajar = (
  params?: { page?: number; per_page?: number; q?: string },
  options?: Omit<UseQueryOptions<TahunAjarResponse, Error>, "queryKey" | "queryFn">
) => {
  const queryKey = params ? [...thajarKeys.lists(), params] as const : thajarKeys.lists();

  return useQuery<TahunAjarResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetchAllThajar(params);
      // fetchAllThajar will throw on non-ok responses, so just return the response
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Backwards-compatible alias used across the app
 */
export const useThajarTable = (params?: { page?: number; per_page?: number; q?: string }) =>
  useGetAllThajar(params);

export default useThajarTable;
