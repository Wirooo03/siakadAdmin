// Types for Kelas Kuliah (data-kelas-kuliah)

export interface KelasKuliahItem {
  id_kls: string;
  kur: string;
  kode: string;
  mata_kuliah: string;
  prodi_penggampu: string;
  nama_kelas: string;
  pengajar: string | null;
  jadwal_mingguan: string | null;
  kapasitas: number;
  peserta: number;
  mbkm: boolean;
  created_at: string;
  updated_at: string;
}

export interface KelasKuliahMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface KelasKuliahData {
  items: KelasKuliahItem[];
  meta: KelasKuliahMeta;
}

export interface KelasKuliahResponse {
  status: string; // e.g. "success"
  message?: string;
  data: KelasKuliahData;
}

// Additional helper types (errors, query params) can be added here
