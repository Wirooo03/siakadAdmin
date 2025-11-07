// =========================
// src/lib/services/data-kampus/data-kuliah/perakad/type.ts
// =========================
// Types for Periode Akademik response
// Matches payload returned from upstream `/api/v1/periode-akademik`
// =========================

export interface PerakadItem {
  kode: string;
  nama_periode: string;
  tgl_awal_kuliah: string | null;
  tgl_akhir_kuliah: string | null;
  tgl_awal_uts: string | null;
  tgl_awal_uas: string | null;
  aktif: number;
}

export interface PerakadResponse {
  filter_list: string[];
  filter_aktif: string;
  data: PerakadItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export type { PerakadItem as PeriodeAkademikItem, PerakadResponse as PeriodeAkademikResponse };
