// =========================
// Imports
// =========================
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { fetchAllSlotWaktu } from "@/lib/services/perkuliahan/slot-waktu/fetchAllSlotWaktu";
import type { SlotWaktuResponse } from "@/lib/services/perkuliahan/slot-waktu/type";

// =========================
// Query Keys
// =========================
export const slotWaktuKeys = {
  all: ["slot-waktu"] as const,
  lists: () => [...slotWaktuKeys.all, "list"] as const,
};

// =========================
// Query Hooks
// =========================

/**
 * Hook to fetch slot waktu via internal route `/api/perkuliahan/slot-waktu`.
 * Returns the full SlotWaktuResponse (grouped by pagi/siang/malam).
 */
export const useGetAllSlotWaktu = (
  options?: Omit<UseQueryOptions<SlotWaktuResponse, Error>, "queryKey" | "queryFn">
) => {
  return useQuery<SlotWaktuResponse, Error>({
    queryKey: slotWaktuKeys.lists(),
    queryFn: async () => {
      const response = await fetchAllSlotWaktu();
      // fetchAllSlotWaktu will throw on non-ok responses, so just return the response
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
export const useSlotWaktuTable = () => useGetAllSlotWaktu();

export default useSlotWaktuTable;
