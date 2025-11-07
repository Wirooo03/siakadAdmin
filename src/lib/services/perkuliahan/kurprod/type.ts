// Types for response from external `/api/v1/kurikulum-prodi`

export interface FilterProdiAktif {
	id_sms: string;
	nama_prodi: string;
}

export interface FilterKurikulumAktif {
	id_kurikulum: string;
	tahun_kurikulum: string;
	nm_kurikulum: string;
}

export interface MatkulItem {
	no: number;
	id_mk_kurikulum: string;
	kode: string;
	nm_mk: string;
	sks: string; // upstream uses string like "3.00"
	status: string; // e.g. "Wajib" | "Pilihan"
	nilai_min?: string | null;
	prasyarat?: string | null;
	konsentrasi_bidang_studi?: string | null;
}

export interface MatkulPerSemester {
	semester: string;
	matkul: MatkulItem[];
	total_sks: number;
	total_wajib: number;
	total_pilihan: number;
}

export interface KurikulumProdiData {
	filter_prodi_aktif: FilterProdiAktif;
	filter_kurikulum_aktif: FilterKurikulumAktif;
	matkul_per_semester: MatkulPerSemester[];
}

export interface KurikulumProdiResponse {
	// the upstream returns a raw object matching KurikulumProdiData
	// so we type it as KurikulumProdiData directly
	// If upstream wraps this in { data: ... } adjust accordingly when observed.
	filter_prodi_aktif: FilterProdiAktif;
	filter_kurikulum_aktif: FilterKurikulumAktif;
	matkul_per_semester: MatkulPerSemester[];
}

export type { MatkulItem as KurikulumMatkul };
