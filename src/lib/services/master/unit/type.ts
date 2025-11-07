// =========================
// src/lib/services/master/unit/type.ts
// =========================
// Types for Master Unit (unit dropdown)
// Matches the payload returned from upstream endpoint
// GET /api/v1/program-studi/dropdown/unit
// =========================

export interface UnitItem {
  kode_unit: string;
  nama_unit: string;
}

export interface UnitResponse {
  status: string;
  data: UnitItem[];
}

export type { UnitItem as MasterUnitItem, UnitResponse as MasterUnitResponse };
