// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllProdi } from "@/lib/services/data-kampus/pendidikan-tinggi/prod/fetchAllProd";
import type { ProgramStudiResponse } from "@/lib/services/data-kampus/pendidikan-tinggi/prod/type";

// =========================
// Query Keys
// =========================
export const prodiKeys = {
  all: ["prodi"] as const,
  lists: () => [...prodiKeys.all, "list"] as const,
  list: (params: string) => [...prodiKeys.lists(), { params }] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch program studi (paginated) via internal route `/api/prodi`.
 * Returns the full ProgramStudiResponse so the consumer can read `.data` and `.pagination`.
 */
export const useGetAllProdi = (
  params?: { page?: number; per_page?: number; q?: string },
  options?: Omit<UseQueryOptions<ProgramStudiResponse, Error>, "queryKey" | "queryFn">
) => {
  const queryKey = params ? [...prodiKeys.lists(), params] as const : prodiKeys.lists();

  return useQuery<ProgramStudiResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetchAllProdi(params);
      // fetchAllProdi will throw on non-ok responses, so just return the response
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Backwards-compatible alias used across the app
 */
export const useProdiTable = (params?: { page?: number; per_page?: number; q?: string }) =>
  useGetAllProdi(params);

export default useProdiTable;
