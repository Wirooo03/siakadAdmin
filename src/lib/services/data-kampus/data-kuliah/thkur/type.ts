// Types for Tahun Kurikulum response from external service `/api/v1/tahun-kurikulum`

export interface TahunKurikulumItem {
	tahun: string;
	keterangan: string;
	mulai_berlaku: string | null;
	tanggal_awal: string | null;
	tanggal_akhir: string | null;
}

export interface FormOption {
	value: string;
	label: string;
}

export interface TahunKurikulumData {
	filter_tersedia: string[];
	list_kurikulum: TahunKurikulumItem[];
	form_options: {
		periode: FormOption[];
	};
}

export interface TahunKurikulumPagination {
	page: number;
	per_page: number;
	total: number;
	last_page: number;
}

export interface TahunKurikulumResponse {
	status: string;
	message: string;
	data: TahunKurikulumData;
	pagination?: TahunKurikulumPagination;
}

export type { TahunKurikulumItem as TahunKurikulum };
