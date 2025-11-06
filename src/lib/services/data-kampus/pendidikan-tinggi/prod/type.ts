// Server-side types for program-studi API
export interface ProgramStudiItem {
  id_sms: string;
  kode: string;
  nama_prodi: string;
  nama_singkat: string;
  ketua_prodi: string | null;
  fakultas: string | null;
  status: string | null;
}

export interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface ProgramStudiResponse {
  status: string;
  unit_aktif: unknown | null;
  jenjang_aktif: {
    id_jenj_didik: string;
    nm_jenj_didik: string;
  };
  status_aktif: {
    id_status_sms: string;
    nama_status: string;
  };
  kolom_aktif: {
    id: string;
    label: string;
  };
  data: ProgramStudiItem[];
  pagination: Pagination;
}
