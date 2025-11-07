// Types for Jenjang Pendidikan (response from SIAKAD endpoint `/api/v1/ref/jenjang-pendidikan`)

export interface JenjangPendidikanItem {
	id_jenj_didik: string;
	nm_jenj_didik: string;
	nama_jenjang_pendidikan_en: string | null;
	urutan_jenjang_pendidikan: number;
	is_perguruan_tinggi: boolean;
	is_pasca_sarjana: boolean;
	is_jenjang_rpl: boolean;
	kode_jenj: string;
	u_jenj_lemb: boolean;
	u_jenj_org: boolean;
}

export interface JenjangPendidikanResponse {
	success: boolean;
	message: string;
	data: JenjangPendidikanItem[];
}
