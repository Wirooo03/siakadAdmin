// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllJenismk } from "@/lib/services/data-kampus/data-kuliah/jenismk/fetchAllJenismk";
import type { JenisMkResponse } from "@/lib/services/data-kampus/data-kuliah/jenismk/type";

// =========================
// Query Keys
// =========================
export const jenismkKeys = {
  all: ["jenis-matkul"] as const,
  lists: () => [...jenismkKeys.all, "list"] as const,
  list: (params: string) => [...jenismkKeys.lists(), { params }] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch jenis mata kuliah via internal route `/api/data-kampus/data-kuliah/jenismk`.
 * Returns the full JenisMkResponse so the consumer can read `.data` array.
 */
export const useGetAllJenismk = (
  params?: { page?: number; per_page?: number; q?: string },
  options?: Omit<UseQueryOptions<JenisMkResponse, Error>, "queryKey" | "queryFn">
) => {
  const queryKey = params ? [...jenismkKeys.lists(), params] as const : jenismkKeys.lists();

  return useQuery<JenisMkResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetchAllJenismk(params);
      // fetchAllJenismk will throw on non-ok responses, so just return the response
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Backwards-compatible alias used across the app
 */
export const useJenismkTable = (params?: { page?: number; per_page?: number; q?: string }) =>
  useGetAllJenismk(params);

export default useJenismkTable;
