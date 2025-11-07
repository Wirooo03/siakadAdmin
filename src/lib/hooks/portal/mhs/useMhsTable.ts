// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllMhs } from "@/lib/services/portal/mhs/fetchAllMhs";
import type { MahasiswaResponse } from "@/lib/services/portal/mhs/type";

// =========================
// Query Keys
// =========================
export const mhsKeys = {
  all: ["mahasiswa"] as const,
  lists: () => [...mhsKeys.all, "list"] as const,
  list: (params: string) => [...mhsKeys.lists(), { params }] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch mahasiswa (paginated) via internal route `/api/portal/mhs`.
 * Returns the full MahasiswaResponse so the consumer can read `.data` and `.pagination`.
 */
export const useGetAllMhs = (
  params?: { page?: number; per_page?: number; q?: string },
  options?: Omit<UseQueryOptions<MahasiswaResponse, Error>, "queryKey" | "queryFn">
) => {
  const queryKey = params ? [...mhsKeys.lists(), params] as const : mhsKeys.lists();

  return useQuery<MahasiswaResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetchAllMhs(params);
      // fetchAllMhs will throw on non-ok responses, so just return the response
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Backwards-compatible alias used across the app
 */
export const useMhsTable = (params?: { page?: number; per_page?: number; q?: string }) =>
  useGetAllMhs(params);

export default useMhsTable;
