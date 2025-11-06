// Types for Slot Waktu (response from SIAKAD endpoint `/api/v1/ref/slot-waktu`)

export interface SlotWaktuItem {
	id: string;
	waktu: string;
}

export interface SlotWaktuGroup {
	pagi: SlotWaktuItem[];
	siang: SlotWaktuItem[];
	malam: SlotWaktuItem[];
}

export interface SlotWaktuResponse {
	status: string; // e.g. "success"
	message: string;
	data: {
		slot_waktu: SlotWaktuGroup;
	};
}
