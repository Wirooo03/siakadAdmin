// Types for Ruangan (response from SIAKAD endpoint `/api/v1/ref/ruang-kuliah`)

export interface UnitItem {
	kode_unit: string;
	nama_unit: string;
}

export interface RuanganItem {
	kode_ruang: string;
	nama_ruang: string;
	lokasi: string;
	kapasitas: number;
	aktif: boolean;
	created_at: string;
	updated_at: string;
	unit?: UnitItem | null; // Optional karena bisa null
}

export interface PaginationLink {
	url: string | null;
	label: string;
	active: boolean;
}

export interface RuanganPagination {
	current_page: number;
	data: RuanganItem[];
	first_page_url: string;
	from: number | null;
	last_page: number;
	last_page_url: string;
	links: PaginationLink[];
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number | null;
	total: number;
}

export interface RuanganResponse {
	status: string; // e.g. "success"
	data: RuanganPagination;
}
