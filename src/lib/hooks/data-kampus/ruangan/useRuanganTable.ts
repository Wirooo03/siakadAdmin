// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllRuangan } from "@/lib/services/data-kampus/ruangan/fetchAllRuangan";
import type { RuanganResponse } from "@/lib/services/data-kampus/ruangan/type";

// =========================
// Query Keys
// =========================
export const ruanganKeys = {
  all: ["ruangan"] as const,
  lists: () => [...ruanganKeys.all, "list"] as const,
  list: (params: string) => [...ruanganKeys.lists(), { params }] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch ruangan (paginated) via internal route `/api/data-kampus/ruangan`.
 * Returns the full RuanganResponse so the consumer can read `.data` and `.pagination`.
 */
export const useGetAllRuangan = (
  params?: { page?: number; per_page?: number; q?: string },
  options?: Omit<UseQueryOptions<RuanganResponse, Error>, "queryKey" | "queryFn">
) => {
  const queryKey = params ? [...ruanganKeys.lists(), params] as const : ruanganKeys.lists();

  return useQuery<RuanganResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetchAllRuangan(params);
      // fetchAllRuangan will throw on non-ok responses, so just return the response
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
export const useRuanganTable = (params?: { page?: number; per_page?: number; q?: string }) =>
  useGetAllRuangan(params);

export default useRuanganTable;
