// Types for Mahasiswa list response from external service `/api/v1/mahasiswa`

export interface MahasiswaItem {
  nim: string;
  nama: string;
  jenjang: string;
  prodi: string;
  tahun_masuk: number;
  status: string;
  smt: number;
  jumlah_SKS: number;
  total_ipk: number;
}

export interface MahasiswaPagination {
  current_page: number;
  per_page: number;
  total_entries: number;
  total_pages: number;
  from: number;
  to: number;
  has_next_page: boolean;
  has_prev_page: boolean;
  available_per_page_options: number[];
}

export interface MahasiswaResponse {
  data: MahasiswaItem[];
  pagination: MahasiswaPagination;
}
