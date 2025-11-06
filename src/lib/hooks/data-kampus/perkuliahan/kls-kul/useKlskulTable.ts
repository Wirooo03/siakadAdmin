// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllKlskul } from "@/lib/services/perkuliahan/klskul/fetchAllKlskul";
import type { KelasKuliahResponse } from "@/lib/services/perkuliahan/klskul/type";

// =========================
// Query Keys
// =========================
export const klskulKeys = {
  all: ["kelas-kuliah"] as const,
  lists: () => [...klskulKeys.all, "list"] as const,
  list: (params: string) => [...klskulKeys.lists(), { params }] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch kelas kuliah (paginated) via internal route `/api/perkuliahan/klskul`.
 * Returns the full KelasKuliahResponse so the consumer can read `.data` and `.meta`.
 */
export const useGetAllKlskul = (
  params?: { page?: number; per_page?: number; q?: string },
  options?: Omit<UseQueryOptions<KelasKuliahResponse, Error>, "queryKey" | "queryFn">
) => {
  const queryKey = params ? [...klskulKeys.lists(), params] as const : klskulKeys.lists();

  return useQuery<KelasKuliahResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetchAllKlskul(params);
      // fetchAllKlskul will throw on non-ok responses, so just return the response
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Backwards-compatible alias used across the app
 */
export const useKlskulTable = (params?: { page?: number; per_page?: number; q?: string }) =>
  useGetAllKlskul(params);

export default useKlskulTable;
