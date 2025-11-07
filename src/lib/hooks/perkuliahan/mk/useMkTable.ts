// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllMk } from "@/lib/services/perkuliahan/mk/fetchAllMk";
import type { MataKuliahResponse } from "@/lib/services/perkuliahan/mk/type";

// =========================
// Query Keys
// =========================
export const mkKeys = {
  all: ["mata-kuliah"] as const,
  lists: () => [...mkKeys.all, "list"] as const,
  list: (params: string) => [...mkKeys.lists(), { params }] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch mata kuliah (paginated) via internal route `/api/perkuliahan/mk`.
 * Returns the full MataKuliahResponse so the consumer can read `.data` and `.pagination`.
 */
export const useGetAllMk = (
  params?: { page?: number; per_page?: number; q?: string },
  options?: Omit<UseQueryOptions<MataKuliahResponse, Error>, "queryKey" | "queryFn">
) => {
  const queryKey = params ? [...mkKeys.lists(), params] as const : mkKeys.lists();

  return useQuery<MataKuliahResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetchAllMk(params);
      // fetchAllMk will throw on non-ok responses, so just return the response
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Backwards-compatible alias used across the app
 */
export const useMkTable = (params?: { page?: number; per_page?: number; q?: string }) =>
  useGetAllMk(params);

export default useMkTable;
