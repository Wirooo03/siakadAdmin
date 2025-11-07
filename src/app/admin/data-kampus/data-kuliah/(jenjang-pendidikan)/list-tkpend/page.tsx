"use client";

import { useJenjangPendidikanTable } from "@/lib/hooks/data-kampus/data-kuliah/jenjang-pendidikan/useJenjangPendidikanTable";
import type { JenjangPendidikanItem } from "@/lib/services/data-kampus/data-kuliah/jenjang-pendidikan/type";

import { 
	FiAward,
	FiCheckCircle,
	FiXCircle,
	FiBook,
} from "react-icons/fi";

export default function Page() {
	const { data, isLoading } = useJenjangPendidikanTable();

	// Filter jenjang PT saja
	const jenjangPT = data?.data?.filter(j => j.is_perguruan_tinggi) || [];
	const jenjangNonPT = data?.data?.filter(j => !j.is_perguruan_tinggi) || [];

	// Skeleton loader component
	const SkeletonRow = () => (
		<tr className="animate-pulse">
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-8"></div>
			</td>
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-32"></div>
			</td>
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-16"></div>
			</td>
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-20"></div>
			</td>
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-20"></div>
			</td>
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-20"></div>
			</td>
		</tr>
	);

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

				/* Slide in from left */
				@keyframes slideInLeft {
					from { opacity: 0; transform: translateX(-30px); }
					to { opacity: 1; transform: translateX(0); }
				}
				.slide-in-left {
					animation: slideInLeft 0.5s ease-out forwards;
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
					Jenjang Pendidikan
				</h1>
				<p className="mt-1 text-sm md:text-base text-slate-600 hover:text-slate-800 transition-colors duration-200">
					Referensi tingkat jenjang pendidikan
				</p>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div className="bg-white rounded-2xl p-4 border-2 border-indigo-200 shadow-md slide-up-hover">
					<div className="flex items-center gap-3">
						<div className="p-3 bg-indigo-500 rounded-xl text-white">
							<FiAward className="text-2xl" />
						</div>
						<div>
							<p className="text-xs text-indigo-600 font-medium">Perguruan Tinggi</p>
							<p className="text-2xl font-bold text-indigo-700">{jenjangPT.length}</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-md slide-up-hover">
					<div className="flex items-center gap-3">
						<div className="p-3 bg-slate-500 rounded-xl text-white">
							<FiBook className="text-2xl" />
						</div>
						<div>
							<p className="text-xs text-slate-600 font-medium">Non Perguruan Tinggi</p>
							<p className="text-2xl font-bold text-slate-700">{jenjangNonPT.length}</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl p-4 border-2 border-green-200 shadow-md slide-up-hover">
					<div className="flex items-center gap-3">
						<div className="p-3 bg-green-500 rounded-xl text-white">
							<FiCheckCircle className="text-2xl" />
						</div>
						<div>
							<p className="text-xs text-green-600 font-medium">Total Jenjang</p>
							<p className="text-2xl font-bold text-green-700">{data?.data?.length || 0}</p>
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
									<FiAward className="text-indigo-200 group-hover:text-white group-hover:rotate-12 group-hover:scale-125 transition-all duration-300 text-sm md:text-base" />
									<span className="group-hover:translate-x-1 transition-transform duration-200">ID</span>
								</div>
							</th>
							<th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold tracking-wider group hover:bg-indigo-700 transition-colors duration-200">
								<div className="flex items-center gap-1 md:gap-2">
									<FiBook className="text-indigo-200 group-hover:text-white group-hover:scale-125 transition-all duration-300 text-sm md:text-base" />
									<span className="group-hover:translate-x-1 transition-transform duration-200">Nama Jenjang</span>
								</div>
							</th>
							<th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold tracking-wider group hover:bg-indigo-700 transition-colors duration-200">
								<div className="flex items-center gap-1 md:gap-2">
									<span className="group-hover:translate-x-1 transition-transform duration-200">Kode</span>
								</div>
							</th>
							<th className="px-3 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-semibold tracking-wider group hover:bg-indigo-700 transition-colors duration-200">
								<div className="flex items-center justify-center gap-1 md:gap-2">
									<span className="group-hover:translate-x-1 transition-transform duration-200">PT</span>
								</div>
							</th>
							<th className="px-3 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-semibold tracking-wider group hover:bg-indigo-700 transition-colors duration-200">
								<div className="flex items-center justify-center gap-1 md:gap-2">
									<span className="group-hover:translate-x-1 transition-transform duration-200">Pasca</span>
								</div>
							</th>
							<th className="px-3 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-semibold tracking-wider group hover:bg-indigo-700 transition-colors duration-200">
								<div className="flex items-center justify-center gap-1 md:gap-2">
									<span className="group-hover:translate-x-1 transition-transform duration-200">RPL</span>
								</div>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100">
						{isLoading ? (
							Array.from({ length: 10 }).map((_, idx) => <SkeletonRow key={idx} />)
						) : !data?.data || data.data.length === 0 ? (
							<tr>
								<td colSpan={6} className="px-6 py-12 text-center">
									<div className="flex flex-col items-center justify-center gap-3">
										<FiAward className="text-5xl text-slate-300" />
										<p className="text-slate-500 font-medium">Tidak ada data jenjang pendidikan</p>
									</div>
								</td>
							</tr>
						) : (
							data.data.map((row: JenjangPendidikanItem, idx: number) => (
								<tr
									key={row.id_jenj_didik}
									className="opacity-0 hover:bg-indigo-50 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group cursor-pointer border-l-4 border-transparent hover:border-indigo-500 animate-[fadeIn_0.5s_ease-out_forwards]"
									style={{ animationDelay: `${idx * 0.05}s` } as React.CSSProperties}
								>
									<td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
										<span className="font-mono font-semibold text-indigo-600 group-hover:text-indigo-800 group-hover:scale-110 inline-block transition-all duration-200">
											{row.id_jenj_didik}
										</span>
									</td>
									<td className="px-3 md:px-6 py-3 md:py-4">
										<span className="text-xs md:text-sm font-medium text-slate-800 group-hover:text-indigo-700 group-hover:translate-x-2 inline-block transition-all duration-300">
											{row.nm_jenj_didik}
										</span>
									</td>
									<td className="px-3 md:px-6 py-3 md:py-4">
										<span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
											{row.kode_jenj}
										</span>
									</td>
									<td className="px-3 md:px-6 py-3 md:py-4 text-center">
										{row.is_perguruan_tinggi ? (
											<FiCheckCircle className="inline text-green-600 text-lg" />
										) : (
											<FiXCircle className="inline text-slate-400 text-lg" />
										)}
									</td>
									<td className="px-3 md:px-6 py-3 md:py-4 text-center">
										{row.is_pasca_sarjana ? (
											<FiCheckCircle className="inline text-green-600 text-lg" />
										) : (
											<FiXCircle className="inline text-slate-400 text-lg" />
										)}
									</td>
									<td className="px-3 md:px-6 py-3 md:py-4 text-center">
										{row.is_jenjang_rpl ? (
											<FiCheckCircle className="inline text-green-600 text-lg" />
										) : (
											<FiXCircle className="inline text-slate-400 text-lg" />
										)}
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
