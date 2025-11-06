// Types for Gedung (response from SIAKAD endpoint `/api/v1/ref/gedung`)

export interface GedungItem {
	kode: string;
	nama: string;
	lokasi_kampus: string;
	alamat: string;
	jml_lantai: number;
	jml_ruang: number;
	latitude: string;
	longitude: string;
	telepon: string;
	created_at: string;
	updated_at: string;
}

export interface PaginationLink {
	url: string | null;
	label: string;
	page: number | null;
	active: boolean;
}

export interface GedungResponse {
	status: string; // e.g. "success"
	data: GedungItem[]; // Array langsung, bukan nested
	current_page?: number;
	first_page_url?: string;
	from?: number | null;
	last_page?: number;
	last_page_url?: string;
	links?: PaginationLink[];
	next_page_url?: string | null;
	path?: string;
	per_page?: number;
	prev_page_url?: string | null;
	to?: number | null;
	total?: number;
}
