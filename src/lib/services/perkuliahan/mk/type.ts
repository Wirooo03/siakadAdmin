// Types for Mata Kuliah response from external service `/api/v1/data-mata-kuliah`

export interface MataKuliahItem {
  id_mk: string;
  kurikulum: number;
  kode: string;
  nama: string;
  sks: number;
  jenis_mk: string;
  prodi: string;
}

export interface MataKuliahPagination {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_records: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface MataKuliahData {
  mata_kuliah: MataKuliahItem[];
  pagination: MataKuliahPagination;
}

export interface MataKuliahResponse {
  status: string; // e.g. "success"
  message?: string;
  data: MataKuliahData;
}

// Additional helper types (errors, query params) can be added here
