"use client";

import { useSlotWaktuTable } from "@/lib/hooks/data-kampus/perguruan-tinggi/slot-waktu/useSlotWaktuTable";
import type { SlotWaktuItem } from "@/lib/services/data-kampus/pendidikan-tinggi/slot-waktu/type";

import { 
	FiClock,
	FiSun,
	FiSunrise,
	FiMoon,
} from "react-icons/fi";

export default function Page() {
	const { data, isLoading } = useSlotWaktuTable();

	// Flatten all slots for display
	const allSlots = data?.data?.slot_waktu 
		? [
				...data.data.slot_waktu.pagi.map(s => ({ ...s, periode: 'Pagi' })),
				...data.data.slot_waktu.siang.map(s => ({ ...s, periode: 'Siang' })),
				...data.data.slot_waktu.malam.map(s => ({ ...s, periode: 'Malam' })),
		  ]
		: [];

	// Skeleton loader component
	const SkeletonRow = () => (
		<tr className="animate-pulse">
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-16"></div>
			</td>
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-24"></div>
			</td>
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-20"></div>
			</td>
		</tr>
	);

	// Get icon based on periode
	const getPeriodeIcon = (periode: string) => {
		switch (periode) {
			case 'Pagi': return <FiSunrise className="text-yellow-500" />;
			case 'Siang': return <FiSun className="text-orange-400" />;
			case 'Malam': return <FiMoon className="text-indigo-500" />;
			default: return <FiClock />;
		}
	};

	// Get badge color based on periode
	const getPeriodeBadge = (periode: string) => {
		switch (periode) {
			case 'Pagi': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
			case 'Siang': return 'bg-orange-100 text-orange-700 border-orange-300';
			case 'Malam': return 'bg-indigo-100 text-indigo-700 border-indigo-300';
			default: return 'bg-slate-100 text-slate-700 border-slate-300';
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 p-4 md:p-8 overflow-hidden">
			<style>{`
				/* Hide scrollbar */
				::-webkit-scrollbar {
					display: none;
				}
				* {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}

				/* Shimmer animation */
				@keyframes shimmer {
					0% { opacity: 0.5; }
					50% { opacity: 1; }
					100% { opacity: 0.5; }
				}
				.shimmer {
					animation: shimmer 2s infinite ease-in-out;
				}

				/* Fade in animation */
				@keyframes fadeIn {
					from { opacity: 0; transform: translateY(20px); }
					to { opacity: 1; transform: translateY(0); }
				}
				.fade-in {
					animation: fadeIn 0.6s ease-out forwards;
				}

				/* Slide in from left */
				@keyframes slideInLeft {
					from { opacity: 0; transform: translateX(-30px); }
					to { opacity: 1; transform: translateX(0); }
				}
				.slide-in-left {
					animation: slideInLeft 0.5s ease-out forwards;
				}

				/* Scale in */
				@keyframes scaleIn {
					from { opacity: 0; transform: scale(0.9); }
					to { opacity: 1; transform: scale(1); }
				}
				.scale-in {
					animation: scaleIn 0.4s ease-out forwards;
				}

				/* Slide up on hover */
				.slide-up-hover {
					transition: transform 0.3s ease;
				}
				.slide-up-hover:hover {
					transform: translateY(-8px);
				}
			`}</style>

			{/* Header */}
			<div className="mb-6 md:mb-8 slide-in-left">
				<h1
					className="text-2xl md:text-4xl font-bold transition-colors duration-300 cursor-default"
					style={{ color: 'var(--siakad-blue)' }}
				>
					Slot Waktu Perkuliahan
				</h1>
				<p className="mt-1 text-sm md:text-base text-slate-600 hover:text-slate-800 transition-colors duration-200">
					Kelola jadwal slot waktu kuliah (Pagi, Siang, Malam)
				</p>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
				<div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 border-2 border-orange-200 shadow-md slide-up-hover">
					<div className="flex items-center gap-3">
						<div className="p-3 bg-orange-500 rounded-xl text-white">
							<FiSunrise className="text-2xl" />
						</div>
						<div>
							<p className="text-xs text-orange-600 font-medium">Pagi</p>
							<p className="text-2xl font-bold text-orange-700">{data?.data?.slot_waktu?.pagi?.length || 0}</p>
						</div>
					</div>
				</div>

				<div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 border-2 border-yellow-200 shadow-md slide-up-hover">
					<div className="flex items-center gap-3">
						<div className="p-3 bg-yellow-500 rounded-xl text-white">
							<FiSun className="text-2xl" />
						</div>
						<div>
							<p className="text-xs text-yellow-600 font-medium">Siang</p>
							<p className="text-2xl font-bold text-yellow-700">{data?.data?.slot_waktu?.siang?.length || 0}</p>
						</div>
					</div>
				</div>

				<div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-4 border-2 border-indigo-200 shadow-md slide-up-hover">
					<div className="flex items-center gap-3">
						<div className="p-3 bg-indigo-500 rounded-xl text-white">
							<FiMoon className="text-2xl" />
						</div>
						<div>
							<p className="text-xs text-indigo-600 font-medium">Malam</p>
							<p className="text-2xl font-bold text-indigo-700">{data?.data?.slot_waktu?.malam?.length || 0}</p>
						</div>
					</div>
				</div>

				<div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border-2 border-slate-200 shadow-md slide-up-hover">
					<div className="flex items-center gap-3">
						<div className="p-3 bg-slate-500 rounded-xl text-white">
							<FiClock className="text-2xl" />
						</div>
						<div>
							<p className="text-xs text-slate-600 font-medium">Total Slot</p>
							<p className="text-2xl font-bold text-slate-700">{allSlots.length}</p>
						</div>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto bg-white rounded-2xl border border-slate-100 shadow-sm">
				<table className="min-w-full divide-y divide-slate-100">
					<thead>
						<tr className="bg-indigo-600 text-white">
							<th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold tracking-wider group">
								<div className="flex items-center gap-1 md:gap-2">
									<FiClock className="text-indigo-200 group-hover:text-white group-hover:rotate-12 group-hover:scale-125 transition-all duration-300 text-sm md:text-base" />
									<span className="group-hover:translate-x-1 transition-transform duration-200">ID</span>
								</div>
							</th>
							<th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold tracking-wider group hover:bg-indigo-700 transition-colors duration-200">
								<div className="flex items-center gap-1 md:gap-2">
									<FiClock className="text-indigo-200 group-hover:text-white group-hover:scale-125 transition-all duration-300 text-sm md:text-base" />
									<span className="group-hover:translate-x-1 transition-transform duration-200">Waktu</span>
								</div>
							</th>
							<th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold tracking-wider group hover:bg-indigo-700 transition-colors duration-200">
								<div className="flex items-center gap-1 md:gap-2">
									<FiSun className="text-indigo-200 group-hover:text-white group-hover:scale-125 transition-all duration-300 text-sm md:text-base" />
									<span className="group-hover:translate-x-1 transition-transform duration-200">Periode</span>
								</div>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100">
						{isLoading ? (
							Array.from({ length: 10 }).map((_, idx) => <SkeletonRow key={idx} />)
						) : allSlots.length === 0 ? (
							<tr>
								<td colSpan={3} className="px-6 py-12 text-center">
									<div className="flex flex-col items-center justify-center gap-3">
										<FiClock className="text-5xl text-slate-300" />
										<p className="text-slate-500 font-medium">Tidak ada data slot waktu</p>
									</div>
								</td>
							</tr>
						) : (
							allSlots.map((row: SlotWaktuItem & { periode: string }, idx: number) => (
								<tr
									key={row.id}
									className="opacity-0 hover:bg-indigo-50 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group cursor-pointer border-l-4 border-transparent hover:border-indigo-500 animate-[fadeIn_0.5s_ease-out_forwards]"
									style={{ animationDelay: `${idx * 0.05}s` } as React.CSSProperties}
								>
									<td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
										<span className="font-mono font-semibold text-indigo-600 group-hover:text-indigo-800 group-hover:scale-110 inline-block transition-all duration-200">
											{row.id}
										</span>
									</td>
									<td className="px-3 md:px-6 py-3 md:py-4">
										<span className="text-xs md:text-sm font-medium text-slate-800 group-hover:text-indigo-700 group-hover:translate-x-2 inline-block transition-all duration-300">
											{row.waktu}
										</span>
									</td>
									<td className="px-3 md:px-6 py-3 md:py-4">
										<span className={`inline-flex items-center gap-1 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold border-2 transition-all duration-300 hover:scale-110 hover:shadow-md ${getPeriodeBadge(row.periode)}`}>
											{getPeriodeIcon(row.periode)}
											{row.periode}
										</span>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
