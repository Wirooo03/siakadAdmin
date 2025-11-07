// Types for Lokasi Kampus (response from SIAKAD endpoint `/api/v1/ref/lokasi-kampus`)

export interface LokasiKampusItem {
	kode: string;
	nama: string;
	alamat: string;
	telepon: string;
	created_at: string;
	updated_at: string;
}

export interface LokasiKampusResponse {
	status: string; // e.g. "success"
	data: LokasiKampusItem[];
}
