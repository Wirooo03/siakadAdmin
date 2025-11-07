"use client";

import { useLokasiKampusTable } from "@/lib/hooks/data-kampus/perguruan-tinggi/lokasi-kampus/useLokasiKampusTable";
import type { LokasiKampusItem } from "@/lib/services/data-kampus/pendidikan-tinggi/lokasi-kampus/type";

import Link from 'next/link';
import { 
	FiMapPin,
	FiHome,
	FiPhone,
	FiMap,
	FiPlus,
	FiEye,
	FiTrash
} from "react-icons/fi";

export default function Page() {
	const { data, isLoading } = useLokasiKampusTable();

	// Skeleton loader component
	const SkeletonRow = () => (
		<tr className="animate-pulse">
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-16"></div>
			</td>
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-32"></div>
			</td>
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-64"></div>
			</td>
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-24"></div>
			</td>
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-24"></div>
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

				/* Pulse glow */
				@keyframes pulseGlow {
					0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
					50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6); }
				}
				.pulse-glow:hover {
					animation: pulseGlow 1.5s ease-in-out infinite;
				}
			`}</style>

			{/* Header */}
			<div className="mb-6 md:mb-8 slide-in-left">
				<h1
					className="text-2xl md:text-4xl font-bold transition-colors duration-300 cursor-default"
					style={{ color: 'var(--siakad-blue)' }}
				>
					Lokasi Kampus
				</h1>
				<p className="mt-1 text-sm md:text-base text-slate-600 hover:text-slate-800 transition-colors duration-200">Kelola data lokasi kampus</p>
			</div>

			{/* Controls Card */}
			<div className="mb-4 md:mb-6 bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-slate-100 scale-in slide-up-hover [animation-delay:0.1s]">
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 md:gap-4">
					<div className="text-sm text-slate-600">
						Total: <span className="font-bold text-indigo-600">{data?.data?.length || 0}</span> lokasi kampus
					</div>

					{/* Add button */}
					<Link
						href="/siakad/admin/create-lokasi-kampus"
						className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--siakad-blue)] text-white rounded-lg shadow-md transform transition-all duration-300 will-change-transform hover:scale-105 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-200 pulse-glow"
					>
						<FiPlus className="text-base transition-transform duration-300" />
						<span className="text-sm font-semibold">Tambah</span>
					</Link>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto bg-white rounded-2xl border border-slate-100 shadow-sm">
				<table className="min-w-full divide-y divide-slate-100">
					<thead>
						<tr className="bg-indigo-600 text-white">
							<th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold tracking-wider group">
								<div className="flex items-center gap-1 md:gap-2">
									<FiHome className="text-indigo-200 group-hover:text-white group-hover:rotate-12 group-hover:scale-125 transition-all duration-300 text-sm md:text-base" />
									<span className="group-hover:translate-x-1 transition-transform duration-200">Kode</span>
								</div>
							</th>
							<th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold tracking-wider group hover:bg-indigo-700 transition-colors duration-200">
								<div className="flex items-center gap-1 md:gap-2">
									<FiMapPin className="text-indigo-200 group-hover:text-white group-hover:scale-125 transition-all duration-300 text-sm md:text-base" />
									<span className="group-hover:translate-x-1 transition-transform duration-200">Nama Lokasi</span>
								</div>
							</th>
							<th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold tracking-wider group hover:bg-indigo-700 transition-colors duration-200">
								<div className="flex items-center gap-1 md:gap-2">
									<FiMap className="text-indigo-200 group-hover:text-white group-hover:scale-125 transition-all duration-300 text-sm md:text-base" />
									<span className="group-hover:translate-x-1 transition-transform duration-200">Alamat</span>
								</div>
							</th>
							<th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold tracking-wider group hover:bg-indigo-700 transition-colors duration-200">
								<div className="flex items-center gap-1 md:gap-2">
									<FiPhone className="text-indigo-200 group-hover:text-white group-hover:scale-125 transition-all duration-300 text-sm md:text-base" />
									<span className="group-hover:translate-x-1 transition-transform duration-200">Telepon</span>
								</div>
							</th>
							<th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold tracking-wider group">
								<div className="flex items-center gap-1 md:gap-2">
									<FiEye className="text-indigo-200 group-hover:text-white transition-all duration-300 text-sm md:text-base" />
									<span className="group-hover:translate-x-1 transition-transform duration-200">Aksi</span>
								</div>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100">
						{isLoading ? (
							Array.from({ length: 5 }).map((_, idx) => <SkeletonRow key={idx} />)
						) : !data?.data || !Array.isArray(data.data) || data.data.length === 0 ? (
							<tr>
								<td colSpan={5} className="px-6 py-12 text-center">
									<div className="flex flex-col items-center justify-center gap-3">
										<FiMapPin className="text-5xl text-slate-300" />
										<p className="text-slate-500 font-medium">Tidak ada data lokasi kampus</p>
									</div>
								</td>
							</tr>
						) : (
							data.data.map((row: LokasiKampusItem, idx: number) => (
								<tr
									key={row.kode}
									className="opacity-0 hover:bg-indigo-50 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group cursor-pointer border-l-4 border-transparent hover:border-indigo-500 animate-[fadeIn_0.5s_ease-out_forwards]"
									style={{ animationDelay: `${idx * 0.05}s` } as React.CSSProperties}
								>
									<td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
										<span className="font-mono font-semibold text-indigo-600 group-hover:text-indigo-800 group-hover:scale-110 inline-block transition-all duration-200">
											{row.kode}
										</span>
									</td>
									<td className="px-3 md:px-6 py-3 md:py-4">
										<span className="text-xs md:text-sm font-medium text-slate-800 group-hover:text-indigo-700 group-hover:translate-x-2 inline-block transition-all duration-300">
											{row.nama}
										</span>
									</td>
									<td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-200">
										{row.alamat}
									</td>
									<td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-200">
										{row.telepon || '-'}
									</td>
									<td className="px-3 md:px-6 py-3 md:py-4 text-right">
										<div className="inline-flex items-center gap-2">
											<Link
												href={`/siakad/admin/lokasi-kampus/${row.kode}`}
												className="inline-flex items-center justify-center p-2 bg-white border-2 border-slate-200 text-slate-600 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200"
												title="Detail"
											>
												<FiEye className="text-sm md:text-base" />
											</Link>
											<button
												onClick={() => {
													if (confirm('Hapus lokasi kampus ini?')) {
														console.log('delete', row.kode);
														// TODO: panggil API delete di sini
													}
												}}
												className="inline-flex items-center justify-center p-2 bg-white border-2 border-slate-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-200"
												title="Hapus"
											>
												<FiTrash className="text-sm md:text-base" />
											</button>
										</div>
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
