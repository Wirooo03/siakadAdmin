// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllFak } from "@/lib/services/data-kampus/pendidikan-tinggi/fak/fetchAllFak";
import type { FakultasResponse } from "@/lib/services/data-kampus/pendidikan-tinggi/fak/type";

// =========================
// Query Keys
// =========================
export const fakKeys = {
  all: ["fakultas"] as const,
  lists: () => [...fakKeys.all, "list"] as const,
  list: (params: string) => [...fakKeys.lists(), { params }] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch fakultas (paginated) via internal route `/api/data-kampus/perguruan-tinggi/fak`.
 * Returns the full FakultasResponse so the consumer can read `.data` and `.pagination`.
 */
export const useGetAllFak = (
  params?: { page?: number; per_page?: number; q?: string },
  options?: Omit<UseQueryOptions<FakultasResponse, Error>, "queryKey" | "queryFn">
) => {
  const queryKey = params ? [...fakKeys.lists(), params] as const : fakKeys.lists();

  return useQuery<FakultasResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetchAllFak(params);
      // fetchAllFak will throw on non-ok responses, so just return the response
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - data dianggap fresh selama 5 menit, tidak fetch ulang
    gcTime: 10 * 60 * 1000, // 10 minutes - cache disimpan 10 menit setelah unused
    refetchOnWindowFocus: false, // Tidak refetch saat user kembali ke tab
    refetchOnMount: false, // Tidak refetch jika data masih fresh
    ...options,
  });
};

/**
 * Backwards-compatible alias used across the app
 */
export const useFakTable = (params?: { page?: number; per_page?: number; q?: string }) =>
  useGetAllFak(params);

export default useFakTable;
