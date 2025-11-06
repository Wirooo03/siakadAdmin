// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllLokasiKampus } from "@/lib/services/data-kampus/lokasi-kampus/fetchAllLokasiKampus";
import type { LokasiKampusResponse } from "@/lib/services/data-kampus/lokasi-kampus/type";

// =========================
// Query Keys
// =========================
export const lokasiKampusKeys = {
  all: ["lokasi-kampus"] as const,
  lists: () => [...lokasiKampusKeys.all, "list"] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch lokasi kampus via internal route `/api/data-kampus/lokasi-kampus`.
 * Returns the full LokasiKampusResponse (flat array response, no pagination).
 */
export const useGetAllLokasiKampus = (
  options?: Omit<UseQueryOptions<LokasiKampusResponse, Error>, "queryKey" | "queryFn">
) => {
  return useQuery<LokasiKampusResponse, Error>({
    queryKey: lokasiKampusKeys.lists(),
    queryFn: async () => {
      const response = await fetchAllLokasiKampus();
      // fetchAllLokasiKampus will throw on non-ok responses, so just return the response
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
export const useLokasiKampusTable = () => useGetAllLokasiKampus();

export default useLokasiKampusTable;
