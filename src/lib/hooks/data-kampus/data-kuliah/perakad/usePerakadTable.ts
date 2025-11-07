// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllPerakad } from "@/lib/services/data-kampus/data-kuliah/perakad/fetchAllPerakad";
import type { PerakadResponse } from "@/lib/services/data-kampus/data-kuliah/perakad/type";

// =========================
// Query Keys
// =========================
export const perakadKeys = {
  all: ["periode-akademik"] as const,
  lists: () => [...perakadKeys.all, "list"] as const,
  list: (params: string) => [...perakadKeys.lists(), { params }] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch periode akademik (paginated) via internal route `/api/data-kampus/data-kuliah/perakad`.
 * Returns the full PerakadResponse so the consumer can read `.data` and `.pagination`.
 */
export const useGetAllPerakad = (
  params?: { page?: number; per_page?: number; q?: string },
  options?: Omit<UseQueryOptions<PerakadResponse, Error>, "queryKey" | "queryFn">
) => {
  const queryKey = params ? [...perakadKeys.lists(), params] as const : perakadKeys.lists();

  return useQuery<PerakadResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetchAllPerakad(params);
      // fetchAllPerakad will throw on non-ok responses, so just return the response
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Backwards-compatible alias used across the app
 */
export const usePerakadTable = (params?: { page?: number; per_page?: number; q?: string }) =>
  useGetAllPerakad(params);

export default usePerakadTable;
