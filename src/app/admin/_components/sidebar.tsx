"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { withAssetsBasePath } from '@/lib/util/basePathAsset';
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	FiHome,
	FiChevronDown,
	FiLayers,
	FiBook,
	FiUsers,
	FiGlobe,
	FiCalendar,
	FiClock,
	FiAward,
	FiGrid,
	FiSettings,
	FiBookOpen,
	FiMapPin,
	FiBox,
	FiTag,
	FiList,
	FiUserCheck,
} from "react-icons/fi";

interface MenuItem {
	label: string;
	path?: string;
	icon: string;
	children?: MenuItem[];
}

interface SidebarProps {
	isSidebarOpen?: boolean;
	onToggle?: () => void;
	onClose?: () => void;
}

const menuItems: MenuItem[] = [
	{
		label: "Dashboard",
		path: "/admin/dashboard",
		icon: "home",
	},
	{
		label: "Data Kampus",
		icon: "globe",
		children: [
			{
				label: "Pendidikan Tinggi",
				icon: "award",
				children: [
					{
						label: "List Fakultas",
						path: "/admin/data-kampus/pendidikan-tinggi/list-fak",
						icon: "layers",
					},
					{
						label: "List Program Studi",
						path: "/admin/data-kampus/pendidikan-tinggi/list-prod",
						icon: "book-open",
					},
					{
						label: "List Lokasi Kampus",
						path: "/admin/data-kampus/pendidikan-tinggi/list-lokkamp",
						icon: "map-pin",
					},
					{
						label: "List Gedung",
						path: "/admin/data-kampus/pendidikan-tinggi/list-gedung",
						icon: "box",
					},
					{
						label: "List Ruangan",
						path: "/admin/data-kampus/pendidikan-tinggi/list-ruang",
						icon: "door-open",
					},
					{
						label: "List Slot Waktu",
						path: "/admin/data-kampus/pendidikan-tinggi/list-slotwaktu",
						icon: "clock",
					},
				],
			},
			{
				label: "Perkuliahan",
				icon: "book",
				children: [
					{
						label: "Periode Akademik",
						path: "/admin/data-kampus/data-kuliah/list-perakad",
						icon: "calendar",
					},
					{
						label: "Tahun Ajaran",
						path: "/admin/data-kampus/data-kuliah/list-thajar",
						icon: "calendar",
					},
					{
						label: "Tahun Kurikulum",
						path: "/admin/data-kampus/data-kuliah/list-thkur",
						icon: "clock",
					},
					{
						label: "Jenjang Pendidikan",
						path: "/admin/data-kampus/data-kuliah/list-tkpend",
						icon: "award",
					},
					{
						label: "Jenis Mata Kuliah",
						path: "/admin/data-kampus/data-kuliah/list-jenismk",
						icon: "tag",
					},
					{
						label: "Kelompok Mata Kuliah",
						path: "/admin/data-kampus/data-kuliah/list-klpkmk",
						icon: "grid",
					},
					{
						label: "Kelas Perkuliahan",
						path: "/admin/perkuliahan/list-klskul",
						icon: "book",
					},
				],
			},
		],
	},
	{
		label: "Perkuliahan",
		icon: "book",
		children: [
			{
				label: "List Mata Kuliah",
				path: "/admin/perkuliahan/list-mk",
				icon: "book-open",
			},
			{
				label: "List Kelas Kuliah",
				path: "/admin/perkuliahan/list-klskul",
				icon: "book",
			},
			{
				label: "Kurikulum Prodi",
				path: "/admin/perkuliahan/create-kurprod",
				icon: "list",
			},
			{
				label: "Setting Prodi",
				path: "/admin/perkuliahan/setting-prodi",
				icon: "settings",
			},
		],
	},
	{
		label: "Portal",
		icon: "users",
		children: [
			{
				label: "List Mahasiswa",
				path: "/admin/portal/list-mhs",
				icon: "user-check",
			},
		],
	},
];

const iconMap: { [key: string]: React.ElementType } = {
	home: FiHome,
	globe: FiGlobe,
	award: FiAward,
	layers: FiLayers,
	"book-open": FiBookOpen,
	"map-pin": FiMapPin,
	box: FiBox,
	"door-open": FiBox,
	clock: FiClock,
	book: FiBook,
	calendar: FiCalendar,
	tag: FiTag,
	grid: FiGrid,
	list: FiList,
	settings: FiSettings,
	users: FiUsers,
	"user-check": FiUserCheck,
};

export default function Sidebar({ isSidebarOpen = true, onToggle, onClose }: SidebarProps) {
	const pathname = usePathname();
	const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
	const [isLoading] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Close when clicking outside the sidebar
	useEffect(() => {
		const handleOutside = (e: MouseEvent | TouchEvent) => {
			const el = sidebarRef.current;
			if (!el) return;
			const target = e.target as Node;
			if (isSidebarOpen && el && !el.contains(target)) {
				// call onClose if provided, otherwise call onToggle to collapse
				if (onClose) {
					onClose();
				} else {
					onToggle?.();
				}
			}
		};

		document.addEventListener("mousedown", handleOutside);
		document.addEventListener("touchstart", handleOutside);

		return () => {
			document.removeEventListener("mousedown", handleOutside);
			document.removeEventListener("touchstart", handleOutside);
		};
	}, [isSidebarOpen, onClose, onToggle]);

	const toggleMenu = (label: string) => {
		setOpenMenus((prev) => ({
			...prev,
			[label]: !prev[label],
		}));
	};

	const isActive = (path?: string) => {
		if (!path) return false;
		return pathname === path;
	};

	const renderIcon = (iconName: string, isActive: boolean = false) => {
		const Icon = iconMap[iconName] || FiLayers;
		return (
			<Icon
				className={`text-lg transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 ${
					isActive ? "text-indigo-600" : "text-slate-600 group-hover:text-indigo-600"
				}`}
			/>
		);
	};

	const SkeletonItem = () => (
		<div className="px-4 py-3 animate-pulse">
			<div className="flex items-center gap-3">
				<div className="w-5 h-5 bg-slate-200 rounded shimmer"></div>
				<div className="h-4 bg-slate-200 rounded shimmer w-32"></div>
			</div>
		</div>
	);

	const renderMenuItem = (item: MenuItem, level: number = 0, parentKey: string = "") => {
		const menuKey = `${parentKey}-${item.label}`;
		const isMenuOpen = openMenus[menuKey];
		const hasChildren = item.children && item.children.length > 0;
		const active = isActive(item.path);
		// Only apply left padding when the sidebar is open. When collapsed we center icons.
		const paddingLeft = isSidebarOpen ? `${(level + 1) * 1}rem` : undefined;

		if (hasChildren) {
			// Render parent menu button even when sidebar is collapsed so icons remain visible.
			// Submenus are only expanded/rendered when the sidebar is open (handled below).
			return (
				<div key={menuKey} className="mb-1">
					<button
						onClick={() => {
							// If sidebar is collapsed, open it instead of toggling submenu.
							if (!isSidebarOpen) {
								onToggle?.();
								return;
							}
							// Normal behavior when sidebar is open: toggle submenu
							toggleMenu(menuKey);
						}}
						className={`w-full px-4 py-3 flex items-center ${!isSidebarOpen ? "justify-center" : "justify-between"} group hover:bg-indigo-50 transition-all duration-300 rounded-lg hover:shadow-md hover:scale-[1.02] hover:translate-x-1 active:scale-95`}
						style={paddingLeft ? { paddingLeft } : undefined}
						title={!isSidebarOpen ? item.label : ""}
					>
						<div className={`flex items-center gap-3 ${!isSidebarOpen ? "justify-center" : ""}`}>
							{renderIcon(item.icon)}
							{isSidebarOpen && (
								<span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700 group-hover:translate-x-1 transition-all duration-200">
									{item.label}
								</span>
							)}
						</div>
						{isSidebarOpen && (
							<div
								className={`transition-all duration-300 group-hover:scale-125 ${
									isMenuOpen ? "rotate-180 text-indigo-600" : "rotate-0 text-slate-400"
								}`}
							>
								<FiChevronDown className="text-sm" />
							</div>
						)}
					</button>

					{/* Submenu with slide animation */}
					{isSidebarOpen && (
						<div
							className={`overflow-hidden transition-all duration-500 ease-in-out ${
								isMenuOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
							}`}
						>
							<div className="mt-1 ml-2 border-l-2 border-slate-200 hover:border-indigo-300 transition-colors duration-300">
								{item.children?.map((child, idx) => (
									<div
										key={`${menuKey}-child-${idx}`}
										className="opacity-0 animate-[slideInLeft_0.3s_ease-out_forwards]"
										style={{ animationDelay: `${idx * 0.05}s` } as React.CSSProperties}
									>
										{renderMenuItem(child, level + 1, menuKey)}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			);
		}

		// Leaf menu item
		return (
			<Link
				key={menuKey}
				href={item.path || "#"}
				onClick={(e) => {
					// If sidebar collapsed, open it instead of navigating
					if (!isSidebarOpen) {
						e.preventDefault();
						onToggle?.();
						return;
					}
					// Close sidebar on mobile when clicking a link
					if (onClose && window.innerWidth < 1024) {
						onClose();
					}
				}}
				className={`block px-4 py-3 mb-1 rounded-lg group transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:translate-x-1 active:scale-95 ${
					active
						? "bg-indigo-600 text-white shadow-lg border-l-4 border-indigo-800"
						: "hover:bg-indigo-50 border-l-4 border-transparent hover:border-indigo-400"
				}`}
				style={{ paddingLeft }}
				title={!isSidebarOpen ? item.label : ""}
			>
				<div className={`flex items-center gap-3 ${!isSidebarOpen && "justify-center"}`}>
					{renderIcon(item.icon, active)}
					{isSidebarOpen && (
						<span
							className={`text-sm font-medium transition-all duration-200 group-hover:translate-x-1 ${
								active ? "text-white" : "text-slate-700 group-hover:text-indigo-700"
							}`}
						>
							{item.label}
						</span>
					)}
				</div>
			</Link>
		);
	};

	return (
		<div ref={sidebarRef} onMouseDown={() => {
					// If collapsed, any click/tap on the sidebar area should open it for discoverability
					if (!isSidebarOpen) {
						onToggle?.();
					}
			}} className={`h-full bg-white border-r border-slate-100 shadow-sm flex flex-col overflow-hidden transition-all duration-300 ${
				isSidebarOpen ? "w-64 sm:w-72" : "w-16 lg:w-16"
			}`}>
			<style jsx global>{`
				/* Hide scrollbar */
				.sidebar-scroll::-webkit-scrollbar {
					display: none;
				}
				.sidebar-scroll {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}

				/* Shimmer */
				@keyframes shimmer {
					0% {
						opacity: 0.5;
					}
					50% {
						opacity: 1;
					}
					100% {
						opacity: 0.5;
					}
				}
				.shimmer {
					animation: shimmer 2s infinite ease-in-out;
				}

				/* Slide in from left */
				@keyframes slideInLeft {
					from {
						opacity: 0;
						transform: translateX(-20px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				/* Float animation */
				@keyframes float {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-8px);
					}
				}
				.float {
					animation: float 3s ease-in-out infinite;
				}

				/* Pulse */
				@keyframes pulse {
					0%,
					100% {
						opacity: 1;
					}
					50% {
						opacity: 0.7;
					}
				}

				/* Scale bounce */
				@keyframes scaleBounce {
					0%,
					100% {
						transform: scale(1);
					}
					50% {
						transform: scale(1.05);
					}
				}
			`}</style>

			{/* Header */}
			<div className="p-4 lg:p-6 bg-indigo-600 shadow-sm border-b border-indigo-800/40 flex items-center justify-between">
				<div className={`flex items-center gap-3 group cursor-pointer ${!isSidebarOpen && "lg:justify-center lg:w-full"}`}>
					<div className="p-0 bg-transparent rounded-lg float transition-transform duration-300 flex-shrink-0 flex items-center justify-center" style={{ width: 44, height: 44 }}>
						<Image
							src={withAssetsBasePath('/logo-uniman.png')}
							alt="Uniman Logo"
							width={40}
							height={40}
							className="object-contain"
						/>
					</div>
					{isSidebarOpen && (
						<div className="lg:block">
							<h2 className="text-lg lg:text-xl font-bold text-white group-hover:scale-105 inline-block transition-transform duration-200">
								SIAKAD
							</h2>
                            <p className="text-xs text-white transition-colors duration-200">
                                Admin Panel
                            </p>
						</div>
					)}
				</div>
				
				{/* Toggle button removed from sidebar header — mobile toggle lives in page header */}
			</div>

			{/* Menu Items */}
			<div className="flex-1 overflow-y-auto py-4 sidebar-scroll">
				{isLoading ? (
					<>
						{Array.from({ length: 6 }).map((_, idx) => (
							<SkeletonItem key={idx} />
						))}
					</>
				) : (
					menuItems.map((item, idx) => (
						<div
							key={`root-${item.label}`}
							className="opacity-0 animate-[slideInLeft_0.4s_ease-out_forwards]"
							style={{ animationDelay: `${idx * 0.1}s` } as React.CSSProperties}
						>
							{renderMenuItem(item, 0, "root")}
						</div>
					))
				)}
			</div>

			{/* Footer */}
			<div className="p-4 border-t border-slate-200 bg-slate-50">
				{isSidebarOpen ? (
					<div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300 cursor-pointer group hover:scale-105 active:scale-95">
						<div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
							<FiUserCheck className="text-white text-sm" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors truncate">
								Admin User
							</p>
							<p className="text-xs text-slate-500 group-hover:text-indigo-500 transition-colors truncate">
								admin@siakad.ac.id
							</p>
						</div>
					</div>
				) : (
					<div className="flex justify-center">
						<div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-300 cursor-pointer hover:scale-110" title="Admin User">
							<FiUserCheck className="text-white text-lg" />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
