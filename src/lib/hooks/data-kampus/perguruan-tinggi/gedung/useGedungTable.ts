// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllGedung } from "@/lib/services/data-kampus/pendidikan-tinggi/gedung/fetchAllGedung";
import type { GedungResponse } from "@/lib/services/data-kampus/pendidikan-tinggi/gedung/type";

// =========================
// Query Keys
// =========================
export const gedungKeys = {
  all: ["gedung"] as const,
  lists: () => [...gedungKeys.all, "list"] as const,
  list: (params: string) => [...gedungKeys.lists(), { params }] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch gedung (paginated) via internal route `/api/data-kampus/gedung`.
 * Returns the full GedungResponse so the consumer can read `.data` and `.pagination`.
 */
export const useGetAllGedung = (
  params?: { page?: number; per_page?: number; q?: string },
  options?: Omit<UseQueryOptions<GedungResponse, Error>, "queryKey" | "queryFn">
) => {
  const queryKey = params ? [...gedungKeys.lists(), params] as const : gedungKeys.lists();

  return useQuery<GedungResponse, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetchAllGedung(params);
      // fetchAllGedung will throw on non-ok responses, so just return the response
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
export const useGedungTable = (params?: { page?: number; per_page?: number; q?: string }) =>
  useGetAllGedung(params);

export default useGedungTable;
