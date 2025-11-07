"use client";

import { useState } from "react";
import { useJenismkTable } from "@/lib/hooks/data-kampus/data-kuliah/jenismk/useJenismkTable";
import type { JenisMkItem } from "@/lib/services/data-kampus/data-kuliah/jenismk/type";

import Link from 'next/link';
import { 
	FiSearch, 
	FiTag,
	FiFileText,
	FiPlus,
	FiEye,
	FiTrash
} from "react-icons/fi";

export default function Page() {
	const [q, setQ] = useState<string>("");

	const { data, isLoading, error } = useJenismkTable({ q });

	// Filter data client-side based on search query
	const filteredData = data?.data?.filter((item: JenisMkItem) => {
		if (!q) return true;
		const searchLower = q.toLowerCase();
		return (
			item.id_jns_mk.toLowerCase().includes(searchLower) ||
			item.nm_jns_mk.toLowerCase().includes(searchLower) ||
			item.kode.toLowerCase().includes(searchLower)
		);
	}) || [];

	// Skeleton loader component
	const SkeletonRow = () => (
		<tr className="animate-pulse">
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-16"></div>
			</td>
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-48"></div>
			</td>
			<td className="px-3 md:px-6 py-3 md:py-4">
				<div className="h-4 bg-slate-200 rounded shimmer w-16"></div>
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

				/* Float animation */
				@keyframes float {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-10px); }
				}
				.float {
					animation: float 3s ease-in-out infinite;
				}

				/* Rotate animation */
				@keyframes rotate {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
				.rotate-hover:hover {
					animation: rotate 0.6s ease-in-out;
				}

				/* Bounce animation */
				@keyframes bounce {
					0%, 100% { transform: translateY(0); }
					50% { transform: translateY(-5px); }
				}
				.bounce-hover:hover {
					animation: bounce 0.4s ease-in-out infinite;
				}

				/* Pulse glow */
				@keyframes pulseGlow {
					0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
					50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6); }
				}
				.pulse-glow:hover {
					animation: pulseGlow 1.5s ease-in-out infinite;
				}

				/* Wiggle */
				@keyframes wiggle {
					0%, 100% { transform: rotate(0deg); }
					25% { transform: rotate(-3deg); }
					75% { transform: rotate(3deg); }
				}
				.wiggle-hover:hover {
					animation: wiggle 0.3s ease-in-out;
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
					Jenis Mata Kuliah
				</h1>
				<p className="mt-1 text-sm md:text-base text-slate-600 hover:text-slate-800 transition-colors duration-200">Kelola data jenis mata kuliah</p>
			</div>

			{/* Controls Card */}
			<div className="mb-4 md:mb-6 bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-slate-100 scale-in slide-up-hover [animation-delay:0.1s]">
				<div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 md:gap-4">
					{/* Search */}
					<div className="relative flex-1 min-w-full sm:min-w-[280px] group">
						<FiSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-600 group-hover:scale-125 transition-all duration-300 wiggle-hover" />
						<input
							type="search"
							placeholder="Cari jenis mata kuliah..."
							value={q}
							onChange={(e) => setQ(e.target.value)}
							className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 text-sm md:text-base bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:scale-[1.02] transition-all duration-300 hover:border-indigo-300 hover:shadow-md"
						/>
					</div>

					{/* Add button (right aligned) */}
					<div className="ml-auto">
						<Link
							href="/siakad/admin/create-jenismk"
							className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--siakad-blue)] text-white rounded-lg shadow-md transform transition-all duration-300 will-change-transform hover:scale-105 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-200 pulse-glow"
						>
							<FiPlus className="text-base transition-transform duration-300" />
							<span className="text-sm font-semibold">Tambah</span>
						</Link>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className="mt-4 overflow-x-auto bg-white rounded-2xl border border-slate-100 shadow-sm">
				<table className="min-w-full divide-y divide-slate-100">
					<thead>
						<tr className="bg-indigo-600 text-white">
							<th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold tracking-wider group">
								<div className="flex items-center gap-1 md:gap-2">
									<FiTag className="text-indigo-200 group-hover:text-white group-hover:rotate-12 group-hover:scale-125 transition-all duration-300 text-sm md:text-base" />
									<span className="group-hover:translate-x-1 transition-transform duration-200">ID</span>
								</div>
							</th>
							<th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold tracking-wider group hover:bg-indigo-700 transition-colors duration-200">
								<div className="flex items-center gap-1 md:gap-2">
									<FiFileText className="text-indigo-200 group-hover:text-white group-hover:rotate-12 group-hover:scale-125 transition-all duration-300 text-sm md:text-base" />
									<span className="group-hover:translate-x-1 transition-transform duration-200">Nama Jenis Mata Kuliah</span>
								</div>
							</th>
							<th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold tracking-wider group hover:bg-indigo-700 transition-colors duration-200">
								<div className="flex items-center gap-1 md:gap-2">
									<FiTag className="text-indigo-200 group-hover:text-white group-hover:rotate-12 group-hover:scale-125 transition-all duration-300 text-sm md:text-base" />
									<span className="group-hover:translate-x-1 transition-transform duration-200">Kode</span>
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
						) : error ? (
							<tr>
								<td colSpan={4} className="px-6 py-8 text-center">
									<div className="text-red-600 font-medium">
										Error loading data: {error.message}
									</div>
								</td>
							</tr>
						) : filteredData.length === 0 ? (
							<tr>
								<td colSpan={4} className="px-6 py-8 text-center">
									<div className="text-slate-500 font-medium">
										{q ? 'Tidak ada data yang sesuai dengan pencarian' : 'Tidak ada data'}
									</div>
								</td>
							</tr>
						) : (
							filteredData.map((row: JenisMkItem, idx: number) => (
								<tr
									key={row.id_jns_mk}
									className="opacity-0 hover:bg-indigo-50 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group cursor-pointer border-l-4 border-transparent hover:border-indigo-500 animate-[fadeIn_0.5s_ease-out_forwards]"
									style={{ animationDelay: `${idx * 0.05}s` } as React.CSSProperties}
								>
									<td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
										<span className="font-mono font-semibold text-indigo-600 group-hover:text-indigo-800 group-hover:scale-110 inline-block transition-all duration-200">
											{row.id_jns_mk}
										</span>
									</td>
									<td className="px-3 md:px-6 py-3 md:py-4">
										<span className="text-xs md:text-sm font-medium text-slate-800 group-hover:text-indigo-700 group-hover:translate-x-2 inline-block transition-all duration-300">
											{row.nm_jns_mk}
										</span>
									</td>
									<td className="px-3 md:px-6 py-3 md:py-4">
										<span className="inline-flex items-center gap-1 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-indigo-100 text-indigo-700 border-2 border-indigo-300 transition-all duration-300 hover:scale-110 hover:shadow-md hover:bg-indigo-200 hover:border-indigo-400">
											<FiTag className="text-xs" />
											{row.kode}
										</span>
									</td>
									<td className="px-3 md:px-6 py-3 md:py-4 text-right">
										<div className="inline-flex items-center gap-2">
											<Link
												href={`/siakad/admin/jenismk/${row.id_jns_mk}`}
												className="inline-flex items-center justify-center p-2 bg-white border-2 border-slate-200 text-slate-600 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200"
												title="Detail"
											>
												<FiEye className="text-sm md:text-base" />
											</Link>
											<button
												onClick={() => {
													if (confirm('Hapus jenis mata kuliah ini?')) {
														console.log('delete', row.id_jns_mk);
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

				{/* Info Footer */}
				{!isLoading && filteredData.length > 0 && (
					<div className="px-3 md:px-6 py-4 md:py-5 bg-slate-50 border-t border-slate-200">
						<div className="text-xs md:text-sm text-slate-600 font-medium hover:text-indigo-600 transition-colors duration-200 cursor-default text-center">
							Total: <span className="text-indigo-600 font-bold px-1.5 md:px-2 py-0.5 md:py-1 bg-indigo-50 rounded-lg hover:bg-indigo-100 hover:scale-110 inline-block transition-all duration-200">{filteredData.length}</span> data
							{q && data?.data && filteredData.length !== data.data.length && (
								<span className="ml-2">
									(dari {data.data.length} total)
								</span>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
