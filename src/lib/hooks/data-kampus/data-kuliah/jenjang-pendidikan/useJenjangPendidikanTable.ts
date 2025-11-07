// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllJenjangPendidikan } from "@/lib/services/data-kampus/data-kuliah/jenjang-pendidikan/fetchAllJenjangPendidikan";
import type { JenjangPendidikanResponse } from "@/lib/services/data-kampus/data-kuliah/jenjang-pendidikan/type";

// =========================
// Query Keys
// =========================
export const jenjangPendidikanKeys = {
  all: ["jenjang-pendidikan"] as const,
  lists: () => [...jenjangPendidikanKeys.all, "list"] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch jenjang pendidikan via internal route `/api/perkuliahan/jenjang-pendidikan`.
 * Returns the full JenjangPendidikanResponse (flat array response).
 */
export const useGetAllJenjangPendidikan = (
  options?: Omit<UseQueryOptions<JenjangPendidikanResponse, Error>, "queryKey" | "queryFn">
) => {
  return useQuery<JenjangPendidikanResponse, Error>({
    queryKey: jenjangPendidikanKeys.lists(),
    queryFn: async () => {
      const response = await fetchAllJenjangPendidikan();
      // fetchAllJenjangPendidikan will throw on non-ok responses, so just return the response
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
export const useJenjangPendidikanTable = () => useGetAllJenjangPendidikan();

export default useJenjangPendidikanTable;
