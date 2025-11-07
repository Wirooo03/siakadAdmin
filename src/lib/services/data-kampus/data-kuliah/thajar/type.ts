// Types for response from external `/api/v1/ref/tahun-ajaran`

export interface TahunAjarItem {
  id_tahun_ajaran: string;
  nm_tahun_ajaran: string;
  a_aktif: boolean;
  tgl_mulai: string | null;
  tgl_selesai: string | null;
  create_date: string | null;
  last_update: string | null;
  expired_date: string | null;
  last_sync: string | null;
  csf: number;
  tahun: string;
}

export interface TahunAjarMeta {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
}

export interface TahunAjarLinks {
  first?: string | null;
  last?: string | null;
  prev?: string | null;
  next?: string | null;
}

export interface TahunAjarResponse {
  status?: string;
  message?: string;
  data: TahunAjarItem[];
  meta?: TahunAjarMeta;
  links?: TahunAjarLinks;
}

export type { TahunAjarItem as TahunAjar };
