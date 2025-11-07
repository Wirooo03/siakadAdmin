// =========================
// src/lib/services/data-kampus/data-kuliah/klpkmk/type.ts
// =========================
// Types for Kelompok Mata Kuliah (kelompok-matkul) response
// Matches the sample payload provided by upstream SIAKAD API.
// =========================

export interface KelompokMkItem {
	id_kelompok_mk: string;
	nm_kelompok_mk: string;
	created_at: string | null;
	updated_at: string | null;
	expired_at: string | null;
	last_update: string | null;
	last_sync: string | null;
	kode: string;
}

export interface KelompokMkResponse {
	status: string;
	data: KelompokMkItem[];
}

export type { KelompokMkItem as KlpMkItem, KelompokMkResponse as KlpMkResponse };
