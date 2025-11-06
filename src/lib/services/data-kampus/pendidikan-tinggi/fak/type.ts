// Types for Fakultas (response from SIAKAD endpoint `/api/v1/ref/fakultas`)

export interface FakultasItem {
	kode_fakultas: string;
	nama_fakultas: string;
	nama_singkat: string;
	alamat: string | null;
	telepon: string | null;
	status: boolean;
}

export interface PaginationLink {
	url: string | null;
	label: string;
	page: number | null;
	active: boolean;
}

export interface FakultasPagination {
	current_page: number;
	data: FakultasItem[];
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

export interface FakultasResponse {
	status: string; // e.g. "success"
	data: FakultasPagination;
}

// Additional helper types can be added here (errors, query params, etc.)
