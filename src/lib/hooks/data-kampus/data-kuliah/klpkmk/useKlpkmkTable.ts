// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllKlpkmk } from "@/lib/services/data-kampus/data-kuliah/klpkmk/fetchAllKlpkmk";
import type { KelompokMkResponse } from "@/lib/services/data-kampus/data-kuliah/klpkmk/type";

// =========================
// Query Keys
// =========================
export const klpkmkKeys = {
  all: ["kelompok-matkul"] as const,
  lists: () => [...klpkmkKeys.all, "list"] as const,
  list: (params: string) => [...klpkmkKeys.lists(), { params }] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch kelompok mata kuliah via internal route `/api/data-kampus/data-kuliah/klpkmk`.
 * Returns the full KelompokMkResponse so the consumer can read `.data` array.
 */
export const useGetAllKlpkmk = (
  params?: { page?: number; per_page?: number; q?: string },
  options?: Omit<UseQueryOptions<KelompokMkResponse, Error>, "queryKey" | "queryFn">
) => {
  const queryKey = params ? [...klpkmkKeys.lists(), params] as const : klpkmkKeys.lists();

  return useQuery<KelompokMkResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetchAllKlpkmk(params);
      // fetchAllKlpkmk will throw on non-ok responses, so just return the response
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Backwards-compatible alias used across the app
 */
export const useKlpkmkTable = (params?: { page?: number; per_page?: number; q?: string }) =>
  useGetAllKlpkmk(params);

export default useKlpkmkTable;
