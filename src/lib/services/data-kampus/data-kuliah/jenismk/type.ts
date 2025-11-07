// =========================
// src/lib/services/data-kampus/data-kuliah/jenismk/type.ts
// =========================
// Types for Jenis Mata Kuliah (jenis-matkul) response
// Matches the sample payload returned by the upstream SIAKAD API.
// =========================

export interface JenisMkItem {
  id_jns_mk: string;
  nm_jns_mk: string;
  created_at: string | null;
  updated_at: string | null;
  expired_at: string | null;
  last_update: string | null;
  last_sync: string | null;
  kode: string;
}

export interface JenisMkResponse {
  status: string;
  data: JenisMkItem[];
}

export type { JenisMkItem as JenisMatkulItem, JenisMkResponse as JenisMatkulResponse };
